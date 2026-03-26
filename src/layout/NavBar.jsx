import Link from "next/link"

export function NavBar(){

    return (

        <div>
            <Link href={'/'}>Home</Link>
            <Link href={'/trending'}>Trending</Link>
            <Link href={'/market'}>Market</Link>
        </div>
    )
}