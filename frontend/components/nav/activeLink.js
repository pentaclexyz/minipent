import { useRouter } from 'next/router'

function ActiveLink({ children, href }) {
    const router = useRouter()
    const style = {
        marginRight: 10,
        fontFamily: router.pathname === href ? 'berkeley-bold' : 'berkeley-regular',
        textDecoration: router.pathname === href ? 'underline' : 'none',
    }

    const handleClick = e => {
        e.preventDefault()
        router.push(href)
    }

    return (
        <a href={href} onClick={handleClick} style={style}>
            {children}
        </a>
    )
}

export default ActiveLink