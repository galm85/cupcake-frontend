import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import {Link} from '@mui/material';
import { capitilize } from '../utils/functions';
import { useNavigate } from 'react-router-dom';


export type BreadCrumbsLink = {
  label:string;
  link:string;
  categoryId?:any;
  catTitle?:string;
}

type Props = {
  links?:BreadCrumbsLink[];
  currentPage?:string;
}

export default function BreadCrumbs({links,currentPage}:Props) {

  const navigate = useNavigate();

  const handleNavigate = (link:BreadCrumbsLink):void=>{
      navigate(link.link,{state:{categoryId:link.categoryId,catTitle:link.catTitle}});
  }

  return (
    <div className='bread-crumbs' role="presentation" >
      <Breadcrumbs aria-label="breadcrumb">
        {links && links.map((link:BreadCrumbsLink,index:number)=>(
          <div className="link" key={index}  onClick={()=>handleNavigate(link)}> {capitilize(link.label)} </div>
        ))}
        <Typography className="title">{currentPage}</Typography>
      </Breadcrumbs>
    </div>
  );
}
