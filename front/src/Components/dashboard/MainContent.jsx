import AddingTasks from "./pages/AddingTasks"
import PickingTasks from "./pages/PickingTasks"
import OfficeNotes from "./pages/OfficeNotes"
import PersonalNotes from "./pages/PersonalNotes"
const MainContent = ({ activeComponent }) => {
  const renderContent = () => {
    switch (activeComponent) {
 case "home":
    return <Home />;

  case "AddingTasks":
    return <AddingTasks />;

  case "PickingTasks":
    return <PickingTasks />;

  case "OfficeNotes":
    return <OfficeNotes />;

  case "PersonalNotes":
    return <PersonalNotes />;
      // case "report":
      //   return <Report />;
      // case "Salaries":
      //   return <Salaries />;
      // case "setting":
      //   return <Setting />;
      // case "ServiceManager":
      //   return <ServiceManager />;
      // case "Shopkeepers":
      //   return <Shopkeepers />;
      // case "Blockes":
      //   return <Residentialunites />;
      // case "StafFManager":
      //   return <StaffManager />;
      // case "Expenses":
      //   return <Expenses />;
      // case "Incomes":
      //   return <Incomes />;
      // case "CreateUsers":
      //   return <CreateUser />;
      // case "BlockesServices":
      //   return <BlockManager />;
      // case "RentManger":
      //   return <Rent />;
      default:
        return "new dashboard";
    }
  };

  return <div className="min-h-[90vh]">{renderContent()}</div>;
};

export default MainContent;
