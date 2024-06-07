import { useState } from "react";
import { DropdownProps } from "../../types";
import "./dropdown.css"

function Dropdown({
  dropdownType,
  option,
  setOption,
}: DropdownProps): JSX.Element {
  const [openedDropdown, setOpenedDropdown] = useState<boolean>(false);

  const editString = (string: string) => {
    if (string === "ux" || string === "ui") {
      return string.toUpperCase();
    } else {
      const arr = string.split("-");
      return arr
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }
  };

  return (
    <>
      <button
        onClick={() => setOpenedDropdown(!openedDropdown)}
        className={`dropdown-btn ${openedDropdown ? "opened" : ""}`}
        role="button"
        id="select"
        value="Select"
        type="button"
        aria-controls={dropdownType}
        aria-haspopup="listbox"
        aria-expanded="false"
      >
        {editString(option)}
      </button>
      <div className="dropdown-container">
        <ul
          className={`dropdown-menu ${openedDropdown ? "opened" : ""}`}
          aria-label={`Set ${dropdownType} option`}
          role="listbox"
          id={dropdownType}
          onClick={() => setOpenedDropdown(!openedDropdown)}
        >
          {dropdownType === "category" &&
            ["bug", "feature", "enhancement", "ux", "ui"].map((category) => (
              <li
                key={`${category}-option`}
                className={`menu-option ${
                  option == category && "option-tagged"
                }`}
                role="option"
                onClick={() => setOption(category)}
              >
                {editString(category)}
              </li>
            ))}
            {dropdownType === "status" &&
                ["suggestion", "planned", "in-progress", "live"].map((status) => (
                <li
                    key={`${status}-option`}
                    className={`menu-option ${
                    option == status && "option-tagged"
                    }`}
                    role="option"
                    onClick={() => setOption(status)}
                >
                    {editString(status)}
                </li>
                ))}
          {/* <li
            className={`menu-option ${category == "bug" && "option-tagged"}`}
            role="option"
            onClick={() => setCategory("bug")}
          >
            Bug
          </li>
          <li
            className={`menu-option ${
              category == "feature" && "option-tagged"
            }`}
            onClick={() => setCategory("feature")}
          >
            Feature
          </li>
          <li
            className={`menu-option ${
              category == "enhancement" && "option-tagged"
            }`}
            onClick={() => setCategory("enhancement")}
          >
            Enhancement
          </li>
          <li
            className={`menu-option ${category == "ux" && "option-tagged"}`}
            onClick={() => setCategory("ux")}
          >
            UX
          </li>
          <li
            className={`menu-option ${category == "ui" && "option-tagged"}`}
            onClick={() => setCategory("ui")}
          >
            UI
          </li> */}
        </ul>
      </div>
    </>
  );
}

export default Dropdown;
