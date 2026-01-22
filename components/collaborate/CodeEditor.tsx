import React, { useState, useRef } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { Play, Settings, FileCode, Download, Copy, Terminal, X, Plus } from 'lucide-react';

interface CodeEditorProps {
    initialLanguage?: string;
    theme?: 'vs-dark' | 'light';
}

const FILES = {
    'script.js': {
        name: 'script.js',
        language: 'javascript',
        value: `// JavaScript Playground
function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("Developer"));
`
    },
    'style.css': {
        name: 'style.css',
        language: 'css',
        value: `/* CSS Styles */
body {
  background-color: #1e1e1e;
  color: #fff;
}
`
    },
    'index.html': {
        name: 'index.html',
        language: 'html',
        value: `<!DOCTYPE html>
<html>
<head>
  <title>My App</title>
</head>
<body>
  <div id="app"></div>
</body>
</html>
`
    },
    'main.py': {
        name: 'main.py',
        language: 'python',
        value: `# Python Script
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print([fibonacci(i) for i in range(10)])
`
    }
};

export const CodeEditor: React.FC<CodeEditorProps> = ({ initialLanguage = 'javascript', theme = 'vs-dark' }) => {
    const [activeFile, setActiveFile] = useState('script.js');
    const [files, setFiles] = useState(FILES);
    const [output, setOutput] = useState<string[]>(['> Ready to execute code...']);
    const [isConsoleOpen, setIsConsoleOpen] = useState(true);
    const editorRef = useRef<any>(null);

    const handleEditorDidMount: OnMount = (editor, monaco) => {
        editorRef.current = editor;
    };

    const runCode = () => {
        const file = files[activeFile as keyof typeof files];
        setOutput(prev => [...prev, `> Running ${file.name}...`]);

        // Mock execution
        setTimeout(() => {
            if (file.language === 'javascript') {
                try {
                    // Capture console.log
                    const logs: string[] = [];
                    const originalLog = console.log;
                    console.log = (...args) => logs.push(args.join(' '));

                    // eslint-disable-next-line no-new-func
                    new Function(files[activeFile as keyof typeof files].value)();

                    console.log = originalLog;
                    setOutput(prev => [...prev, ...logs, '> Execution finished successfully']);
                } catch (err: any) {
                    setOutput(prev => [...prev, `Error: ${err.message}`]);
                }
            } else if (file.language === 'python') {
                setOutput(prev => [...prev, '[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]', '> Execution finished successfully']);
            } else {
                setOutput(prev => [...prev, '> Language execution not supported in browser sandbox']);
            }
        }, 500);
    };

    return (
        <div className="flex h-full bg-[#1e1e1e] text-white overflow-hidden">
            {/* Sidebar - File Explorer */}
            <div className="w-64 bg-[#252526] border-r border-[#333] flex flex-col">
                <div className="p-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Explorer</div>
                <div className="flex-1 overflow-y-auto">
                    {Object.values(files).map((file) => (
                        <div
                            key={file.name}
                            onClick={() => setActiveFile(file.name)}
                            className={`flex items-center gap-2 px-4 py-2 cursor-pointer text-sm ${activeFile === file.name ? 'bg-[#37373d] text-white' : 'text-gray-400 hover:bg-[#2a2d2e]'
                                }`}
                        >
                            <FileCode size={16} className={
                                file.language === 'javascript' ? 'text-yellow-400' :
                                    file.language === 'css' ? 'text-blue-400' :
                                        file.language === 'html' ? 'text-orange-400' :
                                            'text-blue-300'
                            } />
                            {file.name}
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Editor Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Tabs */}
                <div className="flex bg-[#252526] overflow-x-auto no-scrollbar">
                    {Object.values(files).map((file) => (
                        <div
                            key={file.name}
                            onClick={() => setActiveFile(file.name)}
                            className={`flex items-center gap-2 px-4 py-2.5 text-sm border-r border-[#1e1e1e] cursor-pointer min-w-[120px] ${activeFile === file.name ? 'bg-[#1e1e1e] text-white border-t-2 border-t-blue-500' : 'bg-[#2d2d2d] text-gray-400 hover:bg-[#2a2d2e]'
                                }`}
                        >
                            <span className={
                                file.language === 'javascript' ? 'text-yellow-400' :
                                    file.language === 'css' ? 'text-blue-400' :
                                        file.language === 'html' ? 'text-orange-400' :
                                            'text-blue-300'
                            }>•</span>
                            {file.name}
                            <X size={14} className="ml-auto text-gray-500 hover:text-white" />
                        </div>
                    ))}
                    <div className="flex items-center justify-center px-3 hover:bg-[#2a2d2e] cursor-pointer text-gray-400">
                        <Plus size={16} />
                    </div>
                </div>

                {/* Toolbar */}
                <div className="h-10 bg-[#1e1e1e] border-b border-[#333] flex items-center justify-between px-4 gap-3">
                    <div className="flex items-center gap-2">
                        <select
                            className="bg-[#252526] text-gray-300 text-xs border border-[#333] rounded px-2 py-1 focus:outline-none focus:border-blue-500"
                            value={theme}
                            onChange={(e) => {
                                // In a real app, this would lift state up or use context
                                // For now we just log it as we need to change the prop passed to Editor
                                console.log('Theme changed to', e.target.value);
                            }}
                        >
                            <option value="vs-dark">Dark Theme</option>
                            <option value="light">Light Theme</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="p-1.5 text-gray-400 hover:text-white hover:bg-[#333] rounded">
                            <Settings size={16} />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-white hover:bg-[#333] rounded">
                            <Copy size={16} />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-white hover:bg-[#333] rounded">
                            <Download size={16} />
                        </button>
                        <button
                            onClick={runCode}
                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-bold transition-colors"
                        >
                            <Play size={12} fill="currentColor" /> RUN
                        </button>
                    </div>
                </div>

                {/* Monaco Editor */}
                <div className="flex-1 relative">
                    <Editor
                        height="100%"
                        language={files[activeFile as keyof typeof files].language}
                        value={files[activeFile as keyof typeof files].value}
                        theme={theme}
                        onMount={handleEditorDidMount}
                        onChange={(value) => {
                            setFiles(prev => ({
                                ...prev,
                                [activeFile]: { ...prev[activeFile as keyof typeof files], value: value || '' }
                            }));
                        }}
                        options={{
                            minimap: { enabled: true },
                            fontSize: 14,
                            wordWrap: 'on',
                            automaticLayout: true,
                            scrollBeyondLastLine: false,
                        }}
                    />
                </div>

                {/* Console / Terminal */}
                {isConsoleOpen && (
                    <div className="h-48 bg-[#1e1e1e] border-t border-[#333] flex flex-col">
                        <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-[#333]">
                            <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase">
                                <Terminal size={14} /> Console
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => setOutput([])} className="text-xs text-gray-400 hover:text-white">Clear</button>
                                <button onClick={() => setIsConsoleOpen(false)} className="text-gray-400 hover:text-white"><X size={14} /></button>
                            </div>
                        </div>
                        <div className="flex-1 p-4 font-mono text-sm overflow-y-auto">
                            {output.map((line, i) => (
                                <div key={i} className={`${line.startsWith('Error') ? 'text-red-400' : line.startsWith('>') ? 'text-blue-400' : 'text-gray-300'}`}>
                                    {line}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
