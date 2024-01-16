import {Link} from "react-router-dom";

export const Header = () => {
    return (
        <div>
            <Link to={'/recipe'}> Lista Recipes </Link> | <Link to={'/recipe/new'}> Recipe Form </Link>
        </div>
    )
}
