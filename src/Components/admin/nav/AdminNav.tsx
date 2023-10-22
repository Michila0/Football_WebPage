import React from "react";
import { Link, NavigateFunction } from 'react-router-dom';
import {ListItem} from "@mui/material";
import { logoutHandler } from "../../utils/tools.tsx";


interface AdminNavProps {
    navigate: NavigateFunction;
}
export const AdminNav: React.FC<AdminNavProps> = ({}) => {
    const links = [
        {title: "Matches", linkTo: '/admin_matches'},
        {title: "Players", linkTo: '/admin_players'}
    ]

    const renderItem = () => (
        links.map(link => (
            <Link to={link.linkTo} key={link.title}>
                <ListItem className="admin_nav_link">
                    {link.title}
                </ListItem>
            </Link>
        ))
    )
    return (
        <div>
            {renderItem()}
            <ListItem className="admin_nav_link"
                onClick={() => logoutHandler()}
            >
                Log out
            </ListItem>
        </div>
    )
}

