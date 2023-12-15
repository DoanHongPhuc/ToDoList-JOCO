import Today from "../pages/Today/Today";
import Priority from "../pages/Priority/Priority";
import Upcoming from "../pages/Upcoming/Upcoming";
import Filter_Label from "../pages/Filter_Label/Filter_Label";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import SideBarLayout from "../layouts/SideBarLayout/SideBarLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import LabelScreen from "../pages/LabelScreen/LabelScreen";
import FilterScreen from "../pages/FilterScreen/FilterScreen";
const publicRouter = [
    {path: '/',page: Today,layout: SideBarLayout},
    {path: '/priority',page: Priority, layout: SideBarLayout},
    {path: '/upcoming',page: Upcoming,layout: SideBarLayout},
    {path: '/filters&lables',page: Filter_Label,layout: SideBarLayout},
    {path: '/login', page: Login, layout: DefaultLayout},
    {path: '/register', page: Register, layout: DefaultLayout},
    {path: '/filter/:id/:name/:start_date/:end_date',page: FilterScreen,layout: SideBarLayout},
    {path: '/label/:label_id/:label_name',page: LabelScreen,layout: SideBarLayout}
]

export default publicRouter;