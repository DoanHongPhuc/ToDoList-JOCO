import Today from "../components/Today/Today";
import Prority from "../components/Prority/Prority";
import Upcoming from "../components/Upcoming/Upcoming";
import Filter from "../components/Filter/Filter";
const publicRouter = [
    {path: '/',layout: Today},
    {path: '/prority',layout: Prority},
    {path: '/upcoming',layout: Upcoming},
    {path: '/filters&lables',layout: Filter}
]

export default publicRouter;