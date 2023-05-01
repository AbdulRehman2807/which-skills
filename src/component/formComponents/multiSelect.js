import React, { useEffect, useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export default function MultiSelect({ selected, setSelected, items }) {
    const [showOptions, setShowOptions] = useState(false);
    const [options, setOptions] = useState([]);

    const selectItem = (e) => {
        e.isSelected = !e.isSelected;
        setOptions([...options])
        getValues();
    }
    const getValues = () => {
        selected.length = 0;
        setSelected([...selected])
        options.map((e, i) => {
            if (e.isSelected) {
                selected.push(e.value);
            }
        })
        setSelected([...selected])
    }
    useEffect(() => {
        setOptions([...items]);
    }, [])
    return (
        <div style={mainBox}>
            <div onClick={() => setShowOptions(!showOptions)} style={header} >
                <div style={{ width: '190px', overflow: 'hidden' }}>
                    {selected.length >= 3 ? `${selected.length} items selected` :
                        selected.length > 0 ? selected.toString() : 'Choose'}
                </div>
                <ExpandMoreIcon color="white" sx={{ fontSize: '30px' }} />
            </div>
            {
                showOptions &&
                <div style={{
                    backgroundColor: 'white',
                    padding: '5px'
                }}>
                    {options && options.length > 0 &&
                        options.map((e, i) => {
                            return (
                                <div key={i}
                                    onClick={() => selectItem(e)}
                                    className={e.isSelected ? 'selectedItem' : 'itemStyling'}
                                    style={item}>
                                    {
                                        e.isSelected ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />
                                    }
                                    {e.value}
                                </div>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}

//Styling
const mainBox = {
    width: '220px'
}
const header = {
    background: 'black',
    color: 'white',
    padding: '10px',
    cursor: 'pointer',
    userSelect: 'none',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
}
const item = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '7px',
    margin: '7px',
    cursor: 'pointer',
}