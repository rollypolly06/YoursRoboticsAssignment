const Footer = ({version}) => {
  return (
    <div className="fixed bottom-0 right-0 p-4 invisible md:visible">
      <p className="text-xs text-muted">v{version}</p>
    </div>
  )
}

export default Footer;