import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'

export function createTableExtensions() {
  return [
    Table.configure({
      resizable: true,
      cellMinWidth: 80,
      lastColumnResizable: true
    }),
    TableRow,
    TableHeader,
    TableCell
  ]
}
