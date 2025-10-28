export function buttonA11yProps(label){
  return {
    role: 'button',
    'aria-label': label,
    tabIndex: 0,
    onKeyDown: (e)=> {
      if (e.key === 'Enter' || e.key === ' ') e.currentTarget.click()
    }
  }
}


