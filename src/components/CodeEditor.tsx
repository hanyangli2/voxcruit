'use client'

import { Editor } from '@monaco-editor/react'

interface CodeEditorProps {
  code: string
  onChange: (value: string) => void
  language: string
}

export default function CodeEditor({ code, onChange, language }: CodeEditorProps) {
  return (
    <Editor
      height="100%"
      defaultLanguage={language}
      defaultValue={code}
      onChange={(value) => onChange(value || '')}
      theme="vs-dark"
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        scrollBeyondLastLine: false,
        wordWrap: 'on',
        tabSize: 2,
        automaticLayout: true,
      }}
    />
  )
}