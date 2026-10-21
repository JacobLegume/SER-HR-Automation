import { useState } from 'react'
import { APPLICATIONS_KEY, readApplications } from './recruitment'
export default function useApplications() {
  const [initial]=useState(()=>{try{return readApplications(localStorage)}catch{return readApplications({getItem(){throw Error()}})}})
  const [items,setItems]=useState(initial.items)
  const [warning,setWarning]=useState(initial.warning)
  function save(next) {
    // On storage failure keep the previous state; never claim an unsaved change succeeded.
    try {localStorage.setItem(APPLICATIONS_KEY,JSON.stringify(next));setItems(next);setWarning('');return true}
    catch {setWarning('Nie udało się zapisać zmiany. Sprawdź miejsce i uprawnienia przeglądarki, a następnie spróbuj ponownie.');return false}
  }
  return {items,warning,save}
}
