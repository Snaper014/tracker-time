import * as React from 'react';

function FilterTrackers({onTextChange}: {onTextChange: (text: string) => void}){
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onTextChange(e.target.value)
      }
    return (
      <div className="component-search-input">
        <h2 id="Title">Recherche de Trackers</h2>
        <div id="container-search-input">
            <input
            type="text"
            placeholder="libéllé du tracker"
            onChange={handleChange}
            ></input>
        </div>
      </div>
    )
}

export {FilterTrackers};
