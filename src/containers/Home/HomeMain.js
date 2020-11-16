/* eslint-disable react-hooks/exhaustive-deps */
// Libraries
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import EnhancedTable from "../Apartment/ApartmentListing";

import {
    getData
  } from "../../store/actions/App";
import "../main.css"


// Welcome Home Component.
export default function Home(props) {
    const dispatch = useDispatch()
    const [isActiveFilter,setIsActiveFilter] = useState(2)

    useEffect(() => {
      debugger
      dispatch(getData(2));
      }, []);


    const activeFilterHandler = (event) => {
      setIsActiveFilter(event.target.value)
      dispatch(getData(event.target.value));
    }
    
  return (
      <>  
        <div className="header-section">Apartment Wizard</div>
        <div className="text-field-wrapper m-top-5">
                <FormControl  variant="outlined" style={{minWidth: 300}}>
                    <InputLabel shrink ={false } id="active-select-label">Active Filter</InputLabel>
                    <Select
                    labelId="active-select-label"
                    labelWidth={20}
                    id="activefilter"
                    value={isActiveFilter}
                    onChange={activeFilterHandler}
                    >
                    <MenuItem value={2}>All</MenuItem>
                    <MenuItem value={1}>Yes</MenuItem>
                    <MenuItem value={0}>No</MenuItem>
                   
                    </Select>
            </FormControl>
        </div>
        
        <EnhancedTable />
        </>
    );
}
