import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <p>
        &copy; {new Date().getFullYear()} Aayush Seth. Built with{' '}
        <a 
          href="https://tanstack.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="footer-link"
        >
          TanStack
        </a>
      </p>
    </footer>
  )
}

