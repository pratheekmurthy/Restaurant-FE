import React, { useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

const DropDown = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { table,UpdateTable } = props

  const toggle = () => setDropdownOpen(!dropdownOpen);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret color="primary">
        {table.length === 1 ? table : `Select table Number`}
      </DropdownToggle>
      <DropdownMenu>
        {
            table.length >1 && table.map((ele)=>{
                return  <DropdownItem key={ele} value={ele} onClick={(e) => UpdateTable(e)}> {ele}</DropdownItem>
            })
        }
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropDown;
