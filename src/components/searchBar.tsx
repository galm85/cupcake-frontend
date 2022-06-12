import React from 'react'
import {useDispatch} from 'react-redux';
import { searchProducts } from '../redux/actions/products.actions';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import * as _ from "lodash";
import { Product } from '../utils/types';


type Option = {
    _id:string;
    title:string;
}

const SearchBar:React.FC = ()=>{

    const navigate:any = useNavigate();
    const dispatch:any = useDispatch();
    const [value,setValue] = React.useState<string>('');
    const [options,setOption] = React.useState<Product[]>([]);



    const autoComplete = React.useCallback(
        _.debounce(async(text:string)=>{
            const res = await axios.get(`http://localhost:4000/products/auto-complete/${text}`);
            setOption(res.data);
        },1500)
    ,[])


    const handleChange = async(e:any)=>{
        setValue(e.target.value);
       
        if(e.target.value === ''){
            setOption([]);
        }else{
            autoComplete(e.target.value);
        }
    }


    const handleSearch = async()=>{
        if(value !== ''){
            // await dispatch(searchProducts(value));
            setOption([]);
            navigate(`search/${value}`);
            setValue('');
        }

    }


    const handleClickOption = (option:Product)=>{
        navigate(`/menu/${option.category_title[0].title.toLowerCase()}/${option.title.toLowerCase()}`,
        {state:{
            product:option,
            catTitle:option.category_title[0].title
        }})

        setOption([]);

    }

    return (
        <div className="search-bar" >
            <div className="search-field">
                <input type="search" name="search" className='search-input' onChange={handleChange} value={value}/>
                <button type="button" className="search-btn" onClick={()=>handleSearch()}><SearchIcon/></button>   
            </div>
            {options.length > 0 && 
            <div className="options-box">
                {options.map((option)=>(
                    <p key={option._id} onClick={()=>handleClickOption(option)}>{option.title}</p>
                ))}
            </div>
            }
        </div>
    )
}


export default SearchBar;