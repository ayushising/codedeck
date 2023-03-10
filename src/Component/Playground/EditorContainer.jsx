import React from 'react'
import { ModalContext } from '../../Context/ModalContext'
import { BiEditAlt, BiImport, BiExport, BiFullscreen } from 'react-icons/bi'
import Select from 'react-select'
import { languageMap } from '../../Context/PlaygroundContext'
import CodeEditor from './CodeEditor'
function EditorContainer({
  title,
  currentLanguage,
  setCurrentLanguage,
  currentCode,
  setCurrentCode,
  folderId,
  playgroundId,
  saveCode,
  runCode,
  getFile,
  isFullScreen,
  setIsFullScreen
}) {
  const { openModal } = React.useContext(ModalContext)

  const themeOptions = [
    { value: 'githubDark', label: 'githubDark' },
    { value: 'githubLight', label: 'githubLight' },

  ]

  const languageOptions = [
    { value: 'cpp', label: 'cpp' },
    { value: 'javascript', label: 'javascript' },
    { value: 'java', label: 'java' },
    { value: 'python', label: 'python' },
  ]

  const handleThemeChange = (selectedOption) => {
    setCurrentTheme(selectedOption)
  }
  const handleLanguageChange = (selectedOption) => {
    setCurrentLanguage(selectedOption.value)
    setLanguage(selectedOption)
    setCurrentCode(languageMap[selectedOption.value].defaultCode)
  }

  const [currentTheme, setCurrentTheme] = React.useState(themeOptions[0])

  const [language, setLanguage] = React.useState(() => {
    for (let i = 0; i < languageOptions.length; i++) {
      if (languageOptions[i].value === currentLanguage.value) {
        return languageOptions[i].value
      }
    }

  })


  return (
    <div className={`flex flex-col ${isFullScreen ? 'h-100vh' : 'h-[calc(100vh - 4.5rem)]'}`}>
      {
        !isFullScreen &&
        <div className='bg-white flex justify-between items-center flex-wrap p-4'>
          <div className='flex items-center gap-4'>
            <h3 className='font-bold'>{title}</h3>
            <BiEditAlt style={{ fontSize: "1.5rem" }}
              onClick={
                () => openModal({
                  show: true,
                  modalType: 5,
                  identifiers: {
                    folderId: folderId,
                    cardId: playgroundId
                  }
                })} />
          <button type="button" className= "  ml-32 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 mr-2 mb-2 dark: bg-secondary ">Save code</button>
          </div>
          <div className='flex gap-4'>
            <Select
              options={languageOptions}
              value={language}
              onChange={handleLanguageChange}
            />
            <Select
              options={themeOptions}
              value={currentTheme}
              onChange={handleThemeChange}
            />
          </div>
        </div>
      }
      <CodeEditor
        currentCode={currentCode}
        setCurrentCode={setCurrentCode}
        currentTheme={currentTheme}
        currentLanguage={currentLanguage}
        isFullScreen={isFullScreen}
      />
      <div className='bg-white flex justify-between items-center p-4'>
        <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 mr-2 mb-2 dark: bg-secondary' onClick={() => setIsFullScreen((isFullScreen) => !isFullScreen)}>
          <BiFullscreen style={{ fontSize: "1.5rem" }} /> {isFullScreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </button>

        <label htmlFor="inputfile" className='flex items-center font-semibold gap-3'>
          <input className="hidden" type="file" accept="." id="inputfile" onChange={(e) => getFile(e, setCurrentCode)} /> <BiImport style={{ fontSize: "1.5rem" }} /> Import Code
        </label>

        <a className='flex gap-3 items-center ' href={`data:text/plain;charset=utf-8,${encodeURIComponent(currentCode)}`} download="code.txt">
          <BiExport style={{ fontSize: "1.5rem" }} /> Export Code

        </a>
        <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 mr-2 mb-2 dark: bg-secondary' onClick={runCode}>
          RunCode
        </button>


      </div>
    </div>
  )
}

export default EditorContainer