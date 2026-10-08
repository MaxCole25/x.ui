import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'
import { parse } from 'vue/compiler-sfc'
import { slotContracts } from './component-api-slots.mjs'
import { descriptionKey, docComponentName, readApiDescriptions } from './component-api-docs.mjs'
import { controlFor, defaultNoteFor, propUnits } from './component-api-values.mjs'

export const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name).replaceAll('\\', '/')])
export const groups = ['数据与绑定', '内容与展示', '布局与尺寸', '外观与排版', '状态与交互', '浮层与定位', '组件专有功能']
export function groupFor(name) {
  if (/^(default|header|footer|pane|trigger)$/.test(name)) return groups[1]
  if (/^(modelValue|update:|data$|items$|options$|value$|fieldNames|rowKey|keyField)/.test(name)) return groups[0]
  if (/teleport|zIndex|placement|popper|mask|overlay|closeOn|openDelay|closeDelay/i.test(name)) return groups[5]
  if (/Color|Background|Border|radius|font|shadow|opacity|variant|align|padding/i.test(name)) return groups[3]
  if (/width|height|size|gap|full|autoWidth|autoHeight|direction|span|offset|gutter/i.test(name)) return groups[2]
  if (/disabled|readonly|loading|clearable|status|trigger|focus|blur|click|hover|change|input|open|close|show|hide|visible|clear/i.test(name)) return groups[4]
  if (/title|content|label|text|prefix|suffix|icon|placeholder|description|separator|empty|name|^id$/i.test(name)) return groups[1]
  return groups[6]
}
export function typeGroupFor(name) {
  if (/(Slots|SlotProps|SlotContext|PaneContext)$/.test(name)) return '插槽契约'
  if (name.endsWith('Props')) return '属性与配置'
  if (/(Emits|Payload)$/.test(name)) return '事件参数'
  if (/(Expose|Handler|Method|Callback)$/.test(name)) return '实例与回调'
  return '组件数据'
}

const descriptions = { modelValue:'绑定值', fontSize:'字号，单位 px；不改变控件高度、内边距或圆角', radius:'整体圆角，数字按 px 处理', width:'宽度，数字按 px 处理', height:'高度，数字按 px 处理', disabled:'是否禁用', readonly:'是否只读', loading:'是否加载中', closeOnEsc:'是否允许按 Esc 关闭；仅作用于最上层模态框', teleported:'是否将浮层传送到目标容器', teleportTo:'浮层挂载目标的 CSS 选择器', zIndex:'浮层层级', showActiveBorder:'是否显示激活边框', backgroundColor:'背景色', textColor:'文字颜色', borderColor:'边框颜色', borderWidth:'边框宽度，数字按 px 处理' }
Object.assign(descriptions, {
  showIcon:'是否显示图标', center:'是否居中展示内容', id:'原生元素标识 id', accentColor:'主题强调色', showZero:'数值为零时是否显示徽标',
  hoverBackgroundColor:'鼠标悬停背景色', padding:'内边距，数字按 px 处理；字符串使用 CSS 单位', labelColor:'标签文字颜色', viewMode:'文件展示模式：列表或网格',
  labelHeight:'标签区域高度，数字按 px 处理', labelGap:'标签与内容间距，数字按 px 处理', contentHeight:'内容区域高度，数字按 px 处理', labelVisible:'是否显示标签区域',
  activeAncestorTextColor:'激活菜单祖先节点文字颜色', activeAncestorBackgroundColor:'激活菜单祖先节点背景色', pageSizes:'每页条数的可选值列表', pagerCount:'最多显示的页码按钮数量',
  trigger:'浮层触发方式', placement:'浮层首选方向，空间不足时自动翻转', showArrow:'是否显示浮层箭头', textInside:'是否将进度文字放在进度条内部', trackColor:'轨道背景色',
  displayName:'显示名称', showDisplayName:'是否显示名称输入框', showPhone:'是否显示手机号输入框', showSmsCode:'是否显示短信验证码输入框', imageCaptchaAlt:'验证码图片的替代文字',
  gap:'子项间距，数字按 px 处理', round:'是否使用圆形外观', valueColor:'数值文字颜色', titleColor:'标题文字颜色', fullHeight:'是否撑满父容器高度',
  buttonText:'操作按钮文字', accept:'允许选择的文件扩展名或 MIME 类型', tip:'上传提示文字', listType:'上传文件列表的展示样式', avatarIconFull:'是否让图标撑满头像区域', openBackgroundColor:'展开状态背景色'
})
for (const [name,label] of Object.entries({username:'用户名',displayName:'显示名称',phone:'手机号',smsCode:'短信验证码',password:'密码',confirmPassword:'确认密码',imageCode:'图片验证码',letterCode:'字符验证码'})) {
  descriptions[name+'Label'] = label+'标签文字'
  descriptions[name+'Placeholder'] = label+'输入框占位文字'
}
export function inventory() {
  const files = walk('src/components')
  const typeFiles = files.filter(p => p.endsWith('.ts'))
  const vueFiles = files.filter(p=>p.endsWith('.vue') && p.includes('/src/') && !p.includes('/core/'))
  const scripts = new Map(vueFiles.map(file=>[path.resolve(file+'.api.ts'), parse(fs.readFileSync(file,'utf8')).descriptor.scriptSetup?.content??'']))
  const options = { target:ts.ScriptTarget.ES2020, module:ts.ModuleKind.ESNext, moduleResolution:ts.ModuleResolutionKind.Bundler, skipLibCheck:true, strict:true }
  const host=ts.createCompilerHost(options), originalGet=host.getSourceFile.bind(host)
  host.getSourceFile=(file,language,...rest)=>scripts.has(path.resolve(file))?ts.createSourceFile(file,scripts.get(path.resolve(file))+ '\n declare function defineProps<T>(): Readonly<T>; declare function withDefaults<T,D>(props:T,defaults:D):T & D;',language,true):originalGet(file,language,...rest)
  const program = ts.createProgram(['src/index.ts',...typeFiles,...scripts.keys()], options, host)
  const checker = program.getTypeChecker()
  const root = program.getSourceFile('src/index.ts')
  const rootExports = new Set(checker.getExportsOfModule(checker.getSymbolAtLocation(root)).map(symbol => symbol.name))
  const packageName = JSON.parse(fs.readFileSync('package.json', 'utf8')).name
  const publicTypeText = text => text.replace(/import\("src\/(?:components\/)?index"\)\.(\w+)/g, (reference, name) => rootExports.has(name) ? `import("${packageName}").${name}` : reference)
  const interfaces = new Map()
  for (const file of program.getSourceFiles()) {
    if (!file.fileName.replaceAll('\\','/').includes('src/components/')) continue
    for (const node of file.statements) if ((ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) && node.name) interfaces.set(node.name.text, node)
  }
  const result = []
  for (const file of vueFiles) {
    const source=fs.readFileSync(file,'utf8'), descriptor=parse(source).descriptor
    const script=descriptor.scriptSetup?.content
    if (!script) continue
    const sf=program.getSourceFile(path.resolve(file+'.api.ts'))
    let propsName, componentName, defaults={}, events=[], methods=[]
    const visit=node=>{
      if (ts.isCallExpression(node)) {
        const name=node.expression.getText(sf)
        if(name==='defineOptions') componentName=node.arguments[0]?.properties?.find(p=>p.name?.getText(sf)==='name')?.initializer?.text
        if(name==='defineProps') propsName=node.typeArguments?.[0]?.getText(sf).match(/\w+Props/)?.[0]
        if(name==='withDefaults') for(const prop of node.arguments[1]?.properties??[]) if(ts.isPropertyAssignment(prop)) defaults[prop.name.getText(sf).replace(/['"]/g,'')]=prop.initializer.getText(sf)
        if(name==='defineEmits') for(const member of node.typeArguments?.[0]?.members??interfaces.get(node.typeArguments?.[0]?.getText(sf))?.members??[]) {
          if(member.name) events.push({name:member.name.getText().replace(/['"]/g,''),type:member.type?.getText()??'[]'})
          else if(ts.isCallSignatureDeclaration(member)) { const event=member.parameters[0]?.type; if(event && ts.isLiteralTypeNode(event)) events.push({name:event.literal.text,type:'['+member.parameters.slice(1).map(p=>p.getText()).join(', ')+']'}) }
        }
        if(name==='defineExpose') for(const member of node.arguments[0]?.properties??[]) if(member.name) {
          const target=ts.isShorthandPropertyAssignment(member)?checker.getShorthandAssignmentValueSymbol(member):undefined
          const type=target?checker.getTypeOfSymbolAtLocation(target,member):checker.getTypeAtLocation(member.initializer??member)
          methods.push({name:member.name.getText(sf),type:publicTypeText(checker.typeToString(type,member,ts.TypeFormatFlags.NoTruncation))})
        }
      }
      ts.forEachChild(node,visit)
    };visit(sf)
    const declaration=interfaces.get(propsName)
    if(!componentName || !declaration) continue
    const unitFor=propUnits(sf, checker, componentName)
    const props=checker.getPropertiesOfType(checker.getTypeAtLocation(declaration)).map(symbol=>{
      const decl=symbol.valueDeclaration??symbol.declarations?.[0]
      const type=decl?.type?.getText()??checker.typeToString(checker.getTypeOfSymbolAtLocation(symbol,decl??declaration))
      const name=symbol.name
      let value=defaults[name] ?? '—'
      if(value.startsWith('overlayZIndex.')) {
        const initializer=sf.statements.flatMap(statement=>ts.isVariableStatement(statement)?statement.declarationList.declarations:[])
          .find(declaration=>declaration.name.getText()==='props')?.initializer
        // 通过实际常量声明解析层级，不再复制一份魔法数值。
        const findValue=node=>{
          if(ts.isPropertyAccessExpression(node) && node.getText()===value) {
            const type=checker.getTypeAtLocation(node)
            if(type.flags&ts.TypeFlags.NumberLiteral)value=String(type.value)
          }
          ts.forEachChild(node,findValue)
        }
        if(initializer)findValue(initializer)
      }
      const resolvedType=checker.getTypeOfSymbolAtLocation(symbol,decl??declaration)
      return {name,type,default:value,defaultNote:defaultNoteFor(componentName,name),unit:unitFor(name,resolvedType),...controlFor(resolvedType,checker,decl??declaration),group:groupFor(name),description:descriptions[name]??ts.displayPartsToString(symbol.getDocumentationComment(checker))??'',required:!(symbol.flags&ts.SymbolFlags.Optional)}
    })
    const slots=[...source.matchAll(/<slot\b([^>]*)(?:>|\/\s*>)/g)].map(m=>({name:m[1].match(/\bname="([^"]+)"/)?.[1]??'default',type:[...m[1].matchAll(/:([\w-]+)="([^"]+)"/g)].map(x=>`${x[1]}: ${x[2]}`).join('; ')||'无作用域参数'})).filter((x,i,a)=>a.findIndex(y=>y.name===x.name)===i)
    for (const slot of slots) {
      if (slot.name.startsWith('`')) slot.name=slot.name.replaceAll('`','').replace(/\$\{[^}]+\}/g, componentName==='XTabs'?'${name}':'${key}')
      if (slot.name==='getSlotName(column)') slot.name='cell-${key}'
      slot.type=slotContracts[componentName]?.[slot.name]??slot.type
    }
    const typeFile=program.getSourceFile(file.slice(0,file.lastIndexOf('/')+1)+'types.ts')
    const types=(typeFile?.statements??[]).filter(n=>(ts.isInterfaceDeclaration(n)||ts.isTypeAliasDeclaration(n))&&n.modifiers?.some(m=>m.kind===ts.SyntaxKind.ExportKeyword)).map(n=>({name:n.name.text,definition:n.getText(typeFile),exported:rootExports.has(n.name.text)}))
    const folder=file.split('/').slice(0,4).join('/')
    const docPath = `docs/components/${componentName === 'XRadioButton' ? 'radio-button' : folder.split('/').at(-1)}.md`
    if (fs.existsSync(docPath)) {
      const notes = readApiDescriptions(fs.readFileSync(docPath,'utf8'), docComponentName(path.basename(docPath,'.md')))
      for (const prop of props) {
        const description = notes.get(descriptionKey(componentName,'props',prop.name))
        if (!prop.description && description && !description.endsWith(' 配置')) prop.description=description.replaceAll('`','')
      }
    }
    result.push({name:componentName,file,folder,slug:folder.split('/').at(-1),propsName,props,events:events.map(item=>({...item,group:groupFor(item.name)})),slots:slots.map(item=>({...item,group:groupFor(item.name)})),methods:methods.map(item=>({...item,group:groupFor(item.name)})),types:types.map(item=>({...item,group:typeGroupFor(item.name)}))})
  }
  return result
}
if(process.argv[1]?.endsWith('component-api.mjs')) {
  const entries=inventory()
  const file='src/components/_meta/api.json', content=JSON.stringify(entries,null,2)+'\n'
  if (process.argv.includes('--check')) {
    const current=fs.existsSync(file)?fs.readFileSync(file,'utf8').replaceAll('\r\n','\n'):''
    if (current!==content) { console.error('API 清单需要更新，请运行 pnpm api:inventory。'); process.exitCode=1 }
    else console.log(`${entries.length} 个组件的 API 清单已同步。`)
  } else {
    fs.mkdirSync('src/components/_meta',{recursive:true})
    fs.writeFileSync(file,content,'utf8')
    console.log(`已整理 ${entries.length} 个组件的公开 API。`)
  }
}
