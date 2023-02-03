import type {ChangeEventHandler} from "react";

type Props = {
    onChange: ChangeEventHandler<HTMLInputElement>
}

export function SearchBox({onChange}: Props) {
    return (
        <div className='searchBox'>
            <input
                type='text'
                placeholder='search for a movie...'
                onChange={onChange}/>
        </div>
    )
}