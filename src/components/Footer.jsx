import { useTranslation } from 'react-i18next'

export default function Footer(){
  const { t } = useTranslation('t')
  const year = new Date().getFullYear()
  return (
    <footer className="text-center text-slate-500 text-sm py-6">
      <p>{t('footer.note', { year })}</p>
    </footer>
  )
}

