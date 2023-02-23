import { useContext } from 'react'
import SettingsContext from '../context/SettingsContext'


// useSettings hook is used to access the settings context.
const useSettings = () => useContext(SettingsContext)

export default useSettings
