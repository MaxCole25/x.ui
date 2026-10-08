import fs from 'node:fs'
import { inventory, groups, groupFor } from './component-api.mjs'
import { descriptionKey, docComponentName, readApiDescriptions } from './component-api-docs.mjs'
const entries=inventory()
const escape=value=>String(value).replaceAll('|','\\|').replaceAll('\n',' ').replaceAll('\r','')
const cell=value=>'`'+escape(value).replaceAll('`','')+'`'
for(const filename of fs.readdirSync('docs/components').filter(n=>n.endsWith('.md'))) {
 const file='docs/components/'+filename;let source=fs.readFileSync(file,'utf8')
 const slug=filename.slice(0,-3)
 let components=entries.filter(e=>e.slug===slug)
 if(slug==='radio-button')components=entries.filter(e=>e.name==='XRadioButton')
 if(slug==='radio')components=components.filter(e=>e.name==='XRadio')
 if(!components.length)continue
 const descriptions=readApiDescriptions(source, docComponentName(slug))
 source=source.replace(/<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:START -->[\s\S]*?<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:END -->/g,'')
 const sections=source.split(/(?=^## )/m)
 let acceptance=[]
 source=sections.filter(section=>{
   const heading=section.match(/^## (.+)/)?.[1]??''
   if(/验收/.test(heading)){acceptance.push(section.replace(/^## .+/,'## 验收说明'));return false}
   return !/^(?:Props|Events|Slots|Methods|Exposes?|API|属性|事件|插槽|方法|实例方法|公开类型|关联类型|类型定义|CSS 变量|样式变量)(?:\s|$|[（(])/i.test(heading)
 }).join('').trimEnd()
 let api='\n\n'
 const render=(title,kind,columns)=>{
   const nonempty=components.filter(c=>c[kind].length)
   if(!nonempty.length)return
   api+=`## ${title}\n\n`
   if(kind==='props')api+='默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。\n\n'
   for(const component of nonempty){
     for(const group of groups){
       const items=component[kind].filter(item=>groupFor(item.name)===group)
       if(!items.length)continue
       api+=`### ${nonempty.length>1?component.name+' · ':''}${group}\n\n| ${columns.join(' | ')} |\n| ${columns.map(()=>'---').join(' | ')} |\n`
       for(const item of items){
         const existing=descriptions.get(descriptionKey(component.name,kind,item.name))
         let desc=(existing&&!existing.endsWith(' 配置')?existing:undefined)||item.description||`${item.name} ${kind==='props'?'配置':kind==='events'?'事件':kind==='slots'?'插槽':'方法'}`
         if(kind==='props'){
           let def=cell(item.default)
           if(item.defaultNote)def+=`<br>${escape(item.defaultNote)}`
           const unit=item.unit
           api+=`| ${cell(item.name)} | ${desc} | ${cell(item.type)} | ${def} | ${unit} |\n`
         }else if(kind==='events')api+=`| ${cell(item.name)} | ${desc} | ${cell(item.type)} |\n`
         else api+=`| ${cell(item.name)} | ${desc} | ${cell(item.type)} |\n`
       }
       api+='\n'
     }
   }
 }
 render('属性','props',['属性名','说明','类型','默认值','单位'])
 render('事件','events',['事件名','触发说明','参数'])
 render('插槽','slots',['插槽名','说明','作用域参数'])
 render('实例方法','methods',['方法名','说明','签名'])
 const types=[...new Map(components.flatMap(c=>c.types).map(t=>[t.name,t])).values()]
 for (const exported of [true, false]) {
   const items = types.filter(type => type.exported === exported)
   if (!items.length) continue
   api += exported ? '## 公开类型\n\n以下类型可从 `@x-soft88/x-ui` 导入。\n\n' : '## 关联类型\n\n以下定义用于理解接口关联，未从包主入口直接导出；不要按这些名称从包名导入。\n\n'
   for (const type of items) api += `### ${type.name}\n\n\`\`\`ts\n${type.definition}\n\`\`\`\n\n`
 }
 // Preserve existing CSS variable guidance, including non-table explanations.
 const styleSections=sections.filter(s=>/^## (CSS 变量|样式变量)/.test(s))
 if(styleSections.length)api+=styleSections.join('\n').replace(/^## CSS 变量/gm,'## 样式变量')
 const content=source+api+(acceptance.length?acceptance.join('\n').trimEnd():'## 验收说明\n\n- 调整各功能分组中的属性，核对实际显示与默认值。\n- 操作示例并查看绑定值及事件反馈；检查鼠标、键盘和长文本显示。\n')+'\n'
 const previous=fs.readFileSync(file,'utf8')
 if(previous.replaceAll('\r\n','\n').trimEnd()!==content.replaceAll('\r\n','\n').trimEnd())fs.writeFileSync(file,content,'utf8')
}
console.log('组件 API 已按功能分组。')

