import { loadPyodide } from 'pyodide'

interface TransliterateApi {
  process: (args: {
    from: string
    to: string
    input: string
    opts?: object
  }) => string
  autoDetect: (input: string) => string
  languages: Map<string, string[]>
}

const dummyTransliterateApi: TransliterateApi = {
  process: () => {
    throw new Error('TransliterationContext not initialized yet')
  },
  autoDetect: () => {
    throw new Error('TransliterationContext not initialized yet')
  },
  languages: new Map(),
}

export const getTransliterate = async () => {
  try {
    const pyodide = await loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.3/full/',
      packages: ['micropip'],
    })
    const micropip = pyodide.pyimport('micropip')
    await micropip.add_mock_package('marisa-trie', '1.2.1')
    await micropip.add_mock_package('jaconv', '0.4.0')
    await micropip.add_mock_package('pykakasi', '2.3.0')
    await micropip.install(
      'https://files.pythonhosted.org/packages/5b/07/63495f4fb3be0a84025bdac9469a8737e1b71668c64bedfb77b3d160efbe/aksharamukha-2.3-py3-none-any.whl',
      {
        keep_going: true,
      },
    )
    const transliterate = await pyodide.pyimport('aksharamukha.transliterate')
    const languages: Map<string, string[]> = await pyodide.pyimport(
      'aksharamukha.GeneralMap.ScriptCategory',
    )
    return {
      process: ({ from, to, input }) => transliterate.process(from, to, input),
      autoDetect: (input) => transliterate.auto_detect(input),
      languages,
    } satisfies TransliterateApi
  } catch (e) {
    console.error(e)
    return dummyTransliterateApi
  }
}
