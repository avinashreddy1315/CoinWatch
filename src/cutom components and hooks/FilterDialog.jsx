import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogActions, Button, TextField, Slide, FormControl, FormLabel, FormControlLabel, Radio, RadioGroup, Box } from '@mui/material';
import { useCoin } from './CoinContext'; // Adjust the import path as necessary


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

function FilterDialog({ open, onClose }) {

    const [selectFilter, setSelectFilter] = useState('')
    const { setFilter } = useCoin();

    const handleFilterChange = (e) =>{
        setSelectFilter(e.target.value);
    }


    const filter = [
        { name : "Market Cap Asc", value : "market_cap_asc"},
        { name : "Market Cap Desc", value : "market_cap_desc"},
        { name : "Volume Asc", value : "volume_asc" },
        { name : "Volume Desc", value : "volume_desc"},
        { name : "Id Asc", value : "id_asc" },
        { name : "Id Desc", value : "id_desc"}
    ]

    const handlesave = () =>{
        setFilter(selectFilter);
        onClose();
    }

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={onClose}
            PaperProps={{
                component: 'form',
                style: {
                    backgroundColor: '#e0e0e2',
                    color: 'white',
                    margin: 0,
                    position: 'absolute',
                    top: '20%',
                    left: '7.5%',
                    transform: 'translate(-30%, -20%)',
                    width: '300px',
                    borderRadius: '15px',
                    padding: '3px',
                },
            }}>
            <DialogContent>
            <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group" style={{ color: 'black', fontWeight: 'bold' }}>Filter the List
                {<div style={{color: 'gray', fontSize: '12px', fontWeight: '400'}}>please click save to show the result</div>}</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={selectFilter}
                    onChange={handleFilterChange}
                    style={{ marginTop: '10px' }}
                >
                    {filter.map((fil)=>(
                        <FormControlLabel style={{color : selectFilter == fil.value ? 'blue':'black' }} key={fil.name} value={fil.value} control={<Radio />} label={
                            <Box display="flex" alignItems="center" style={{marginLeft : '5px'}}>
                                {fil.name} 
                            </Box>}/>
                    ))}

                </RadioGroup>
                </FormControl>
                <DialogActions>
                    <Button onClick={handlesave} style={{ color: 'black', border: '0.5px solid gray', borderRadius: '15px', backgroundColor: 'green', fontWeight: 'bold' }}>
                        Save
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}

export default FilterDialog
