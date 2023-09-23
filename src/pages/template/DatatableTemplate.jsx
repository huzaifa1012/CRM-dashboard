import "../../style/datatable.css";
import React, { useState, useEffect, useRef, Fragment } from "react";
import axios from "axios";
import PopupAlert from "../../components/popupalert/popupAlert";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { Dialog, Transition } from "@headlessui/react";
// Tailwind Imports for 3 dot
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
// end

const DatatableTemplate = () => {
  const [applications, setApplicationData] = useState([]);
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpText, setPopupText] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [Open, setModalOpen] = useState(false);
  const [viewApplicaiton, setApplicationModal] = useState(false);
  const [Assigned, setAssigned] = useState(false);
  const [agents, setAgents] = useState([]);
  const [applicationId, setApplicationID] = useState("");
  const [agentId, setAgentId] = useState([]);
  const [ApplicationModalData, setApplicationModalData] = useState([]);
  const cancelButtonRef = useRef(null);

  // Applicaiton Update State
  const [coreName, setCoreName] = useState(ApplicationModalData.firstname);
  const [isEditing, setIsEditing] = useState(false); // Flag to track editing mode
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [region, setRegion] = useState("");
  const [province, setProvince] = useState("");
  const [nationality, setNationality] = useState("");
  const [countryLivingIn, setCountryLivingIn] = useState("");
  const [nic, setNic] = useState("");
  const [englishTest, setEnglishTest] = useState("");
  const [CGPA, setCGPA] = useState("");
  const [score, setScore] = useState("");
  const [passport, setPassport] = useState("");
  const [dateOfBirth, setDob] = useState("");
  const [monthOfBirth, setMob] = useState("");
  const [yearOfBirth, setYob] = useState("");
  const [address, setAddress] = useState("");

  const handleClose = () => {
    console.log("Chalgya");
    setApplicationModal(false);
  };
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  // Function to handle updating the application data
  const handleUpdateApplication = async (programId) => {
    const requestData = {
      ...(programId && { programId }),
      ...(firstName && { firstname: firstName }),
      ...(lastName && { lastname: lastName }),
      ...(nic && { nic }),
      ...(gender && { gender }),
      ...(phone && { phoneNo: phone }),
      ...(email && { email }),
      ...(region && { region }),
      ...(nationality && { nationality }),
      ...(countryLivingIn && { countryLivingIn }),
      ...(province && { province }),
      ...(nic && { englishTest }),
      ...(CGPA && { CGPA }),
      ...(score && { score }),
      ...(passport && { passport }),
      ...(dateOfBirth && { dateOfBirth }),
      ...(monthOfBirth && { monthOfBirth }),
      ...(yearOfBirth && { yearOfBirth }),
      ...(address && { address }),
    };

    try {
      const response = await axios.patch(
        "https://studyapi.ieodkv.com/applications/update/6509505219805a3588311a80/650012da5c97b7265af36cd4",
        requestData
      );

      console.log("Application Update Response", response.data);
      setModalOpen(false);
    } catch (error) {
      console.log("Update Error", error);
    }

    setIsEditing(false);
  };
  // ends
  const handleCheckboxChange = () => {
    setAssigned(!Assigned);
  };
  const Switcher13 = () => {
    return (
      <>
        <label className="themeSwitcherThree relative inline-flex   mb-1 cursor-pointer select-none items-center">
          <input
            type="checkbox"
            checked={Assigned}
            onChange={handleCheckboxChange}
            className="sr-only"
          />

          <div className="shadow-card flex  w-[192px] items-center justify-center rounded-md bg-white mr-5">
            <span
              className={`flex h-9 p-5  items-center justify-center rounded ${
                !Assigned ? "bg-primary text-white" : "text-body-color"
              }`}
            >
              Unassigned
            </span>
            <span
              className={`flex h-9  p-5  items-center justify-center rounded ${
                Assigned ? "bg-primary text-white" : "text-body-color"
              }`}
            >
              Assigned
            </span>
          </div>
        </label>
      </>
    );
  };
  const CustomTable = ({ data }) => {
    return (
      <div className="">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="px-4 py-2 text-left">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedRows.length === data.length}
                />
              </th>
              {Assigned && <th className="px-4 py-2 text-left">Agent</th>}
              <th className="px-4 py-2 text-left">Student</th>
              <th className="px-4 py-2 text-left">Gender</th>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Program</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
  {data.length === 0 ? ( // Check if there is no data
    <tr>
      <td colSpan="7" className="text-center py-4">
        No {Assigned ? "Assign data available ": "Unassign data available" }
      </td>
    </tr>
  ) : (
    data.map((row, index) => (
      <tr key={row._id} onClick={() => handleRowClick(row)}>
        <td className="px-4 py-2 text-left">
          <input
            type="checkbox"
            onChange={() => {
              setSelectedRows((prevSelectedRows) => {
                if (prevSelectedRows.includes(row._id)) {
                  return prevSelectedRows.filter((id) => id !== row._id);
                } else {
                  return [...prevSelectedRows, row._id];
                }
              });
            }}
            checked={selectedRows.includes(row._id)}
          />
        </td>
        {Assigned && (
          <td className="px-4 py-2 text-left">
            {row.case_owner?.username}
          </td>
        )}
        <td className="px-4 py-2 text-left">
          {row.firstname + " " + row.lastname}
        </td>
        <td className="px-4 py-2 text-left">{row.studentId.gender}</td>
        <td className="px-4 py-2 text-left">{row._id}</td>
        <td className="px-4 py-2 text-left">{row.programId.name}</td>
        <td className="px-4 py-2 text-left">
          <select
            onChange={(event) => handleAssignApplication(event)}
            className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
            value=""
          >
            <option value="" disabled>
              Assign to an agent
            </option>

            {agents.map((data, index) => {
              const agentValue = JSON.stringify({
                _id: data._id,
                username: data.username,
              });
              return (
                <option key={index} value={agentValue}>
                  {data.username}
                </option>
              );
            })}
          </select>

          <div className="w-full flex justify-between align-center py-1">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  Options
                  <ChevronDownIcon
                    className="-mr-1 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Edit
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Duplicate
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Archive
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Move
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Share
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Add to favorites
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          onClick={() => askHandleDelete(row._id)}
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Delete
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            <button
              onClick={() => handleViewApplication(row)}
              className="bg-primary hover:bg-red-700 text-white  py-1 px-2 rounded"
            >
              View
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white  py-1 px-2 rounded mx-3 ">
              Edit
            </button>
          </div>
        </td>
      </tr>
    ))
  )}
</tbody>
        </table>
      </div>
    );
  };

  const AddForm = () => {
    // State to manage form inputs
    const [formData, setFormData] = useState({
      field1: "",
      field2: "",
      field3: "",
      field4: "",
      field5: "",
      field6: "",
      field7: "",
      field8: "",
      field9: "",
      field10: "",
    });

    // Function to handle form input changes
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    // Function to handle form submission (you can implement this as needed)
    const handleSubmit = (e) => {
      e.preventDefault();
      // Add your logic for submitting the form data here
    };

    return (
      <div className="bg-#00B894 p-4">
        <form
          className="bg-white rounded-lg p-8 shadow-md"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl text-left mb-4">Add Data</h2>

          <div className="grid grid-cols-2 gap-4">
            {/* Left Column */}
            <div>
              <input
                type="text"
                name="field1"
                // value={formData.field1}
                onChange={handleInputChange}
                className="  w-full mb-2 px-3  pb-5 pt-5   border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Field 1"
                required
              />

              <input
                type="text"
                name="field1"
                // value={formData.field1}
                onChange={handleInputChange}
                className="  w-full mb-2 px-3  pb-5 pt-5   border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Field 1"
                required
              />

              <input
                type="text"
                name="field1"
                // value={formData.field1}
                onChange={handleInputChange}
                className="  w-full mb-2 px-3  pb-5 pt-5   border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Field 1"
                required
              />

              <input
                type="text"
                name="field1"
                // value={formData.field1}
                onChange={handleInputChange}
                className="  w-full mb-2 px-3  pb-5 pt-5   border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Field 1"
                required
              />

              <input
                type="text"
                name="field1"
                // value={formData.field1}
                onChange={handleInputChange}
                className="  w-full mb-2 px-3  pb-5 pt-5   border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Field 1"
                required
              />

              <input
                type="text"
                name="field1"
                // value={formData.field1}
                onChange={handleInputChange}
                className="  w-full mb-2 px-3  pb-5 pt-5   border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Field 1"
                required
              />

              {/* Add four more fields here */}
            </div>

            {/* Right Column */}
            <div>
              <input
                type="text"
                name="field6"
                // value={formData.field6}
                onChange={handleInputChange}
                className="  w-full mb-2 px-3  pb-5 pt-5  border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Field 6"
                required
              />
              <input
                type="text"
                name="field6"
                // value={formData.field6}
                onChange={handleInputChange}
                className="  w-full mb-2 px-3  pb-5 pt-5  border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Field 6"
                required
              />
              <input
                type="text"
                name="field6"
                // value={formData.field6}
                onChange={handleInputChange}
                className="  w-full mb-2 px-3  pb-5 pt-5  border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Field 6"
                required
              />
              <input
                type="text"
                name="field6"
                // value={formData.field6}
                onChange={handleInputChange}
                className="  w-full mb-2 px-3  pb-5 pt-5  border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Field 6"
                required
              />
              <input
                type="text"
                name="field6"
                // value={formData.field6}
                onChange={handleInputChange}
                className="  w-full mb-2 px-3  pb-5 pt-5  border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Field 6"
                required
              />
              <input
                type="text"
                name="field6"
                // value={formData.field6}
                onChange={handleInputChange}
                className="  w-full mb-2 px-3  pb-5 pt-5  border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Field 6"
                required
              />
              {/* Add four more fields here */}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-primary text-white hover:bg-#002f5f py-2 px-4 rounded-md mr-2"
            >
              Add
            </button>
            
            <button
              type="button"
              className="bg-red-500 text-white hover:bg-red-600 py-2 px-4 rounded-md"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    );
  };
  const UpdateFormData = () => {
    // State to manage form inputs
    const [update, setUpdate] = useState(false)
    const [formData, setFormData] = useState({
      field1: "",
      field2: "",
      field3: "",
      field4: "",
      field5: "",
      field6: "",
      field7: "",
      field8: "",
      field9: "",
      field10: "",
    });

    // Function to handle form input changes
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    // Function to handle form submission (you can implement this as needed)
    const handleSubmit = (e) => {
      e.preventDefault();
      // Add your logic for submitting the form data here
    };

    return (
      <div className="bg-#00B894 p-4">
        <form
          className="bg-white rounded-lg p-8 shadow-md"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl text-left mb-4">View & Update Data</h2>

          <div className="grid grid-cols-2 gap-4">
            {/* Left Column */}
            <div>
              {update ? 
              <input
                type="text"
                name="field1"
                // value={formData.field1}
                onChange={handleInputChange}
                className="  w-full mb-2 px-3  pb-5 pt-5   border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Field 1"
                required
              />
              : 
              <>
                <h1 className="w-full mb-2 px-3  pb-2 pt-2  rounded-md focus:outline-none focus:ring focus:ring-blue-200">Field : Value</h1>
              </>}
              {update ? 
              <input
                type="text"
                name="field1"
                // value={formData.field1}
                onChange={handleInputChange}
                className="  w-full mb-2 px-3  pb-5 pt-5   border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Field 1"
                required
              />
              : 
              <>
                <h1 className="w-full mb-2 px-3  pb-2 pt-2  rounded-md focus:outline-none focus:ring focus:ring-blue-200">Field : Value</h1>
              </>}
              {update ? 
              <input
                type="text"
                name="field1"
                // value={formData.field1}
                onChange={handleInputChange}
                className="  w-full mb-2 px-3  pb-5 pt-5   border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Field 1"
                required
              />
              : 
              <>
                <h1 className="w-full mb-2 px-3  pb-2 pt-2  rounded-md focus:outline-none focus:ring focus:ring-blue-200">Field : Value</h1>
              </>}
              {update ? 
              <input
                type="text"
                name="field1"
                // value={formData.field1}
                onChange={handleInputChange}
                className="  w-full mb-2 px-3  pb-5 pt-5   border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Field 1"
                required
              />
              : 
              <>
                <h1 className="w-full mb-2 px-3  pb-2 pt-2  rounded-md focus:outline-none focus:ring focus:ring-blue-200">Field : Value</h1>
              </>}
              {update ? 
              <input
                type="text"
                name="field1"
                // value={formData.field1}
                onChange={handleInputChange}
                className="  w-full mb-2 px-3  pb-5 pt-5   border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Field 1"
                required
              />
              : 
              <>
                <h1 className="w-full mb-2 px-3  pb-2 pt-2  rounded-md focus:outline-none focus:ring focus:ring-blue-200">Field : Value</h1>
              </>}
              {update ? 
              <input
                type="text"
                name="field1"
                // value={formData.field1}
                onChange={handleInputChange}
                className="  w-full mb-2 px-3  pb-5 pt-5   border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Field 1"
                required
              />
              : 
              <>
                <h1 className="w-full mb-2 px-3  pb-2 pt-2  rounded-md focus:outline-none focus:ring focus:ring-blue-200">Field : Value</h1>
              </>}
              {/* Add four more fields here */}
            </div>

            {/* Right Column */}
            <div>
              {update ? 
              <input
                type="text"
                name="field1"
                // value={formData.field1}
                onChange={handleInputChange}
                className="  w-full mb-2 px-3  pb-5 pt-5   border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Field 1"
                required
              />
              : 
              <>
                <h1 className="w-full mb-2 px-3  pb-2 pt-2  rounded-md focus:outline-none focus:ring focus:ring-blue-200">Field : Value</h1>
              </>}
              {update ? 
              <input
                type="text"
                name="field1"
                // value={formData.field1}
                onChange={handleInputChange}
                className="  w-full mb-2 px-3  pb-5 pt-5   border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Field 1"
                required
              />
              : 
              <>
                <h1 className="w-full mb-2 px-3  pb-2 pt-2  rounded-md focus:outline-none focus:ring focus:ring-blue-200">Field : Value</h1>
              </>}
              {update ? 
              <input
                type="text"
                name="field1"
                // value={formData.field1}
                onChange={handleInputChange}
                className="  w-full mb-2 px-3  pb-5 pt-5   border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Field 1"
                required
              />
              : 
              <>
                <h1 className="w-full mb-2 px-3  pb-2 pt-2  rounded-md focus:outline-none focus:ring focus:ring-blue-200">Field : Value</h1>
              </>}
              {update ? 
              <input
                type="text"
                name="field1"
                // value={formData.field1}
                onChange={handleInputChange}
                className="  w-full mb-2 px-3  pb-5 pt-5   border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Field 1"
                required
              />
              : 
              <>
                <h1 className="w-full mb-2 px-3  pb-2 pt-2  rounded-md focus:outline-none focus:ring focus:ring-blue-200">Field : Value</h1>
              </>}
              {update ? 
              <input
                type="text"
                name="field1"
                // value={formData.field1}
                onChange={handleInputChange}
                className="  w-full mb-2 px-3  pb-5 pt-5   border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Field 1"
                required
              />
              : 
              <>
                <h1 className="w-full mb-2 px-3  pb-2 pt-2  rounded-md focus:outline-none focus:ring focus:ring-blue-200">Field : Value</h1>
              </>}
              {update ? 
              <input
                type="text"
                name="field1"
                // value={formData.field1}
                onChange={handleInputChange}
                className="  w-full mb-2 px-3  pb-5 pt-5   border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Field 1"
                required
              />
              : 
              <>
                <h1 className="w-full mb-2 px-3  pb-2 pt-2  rounded-md focus:outline-none focus:ring focus:ring-blue-200">Field : Value</h1>
              </>}
              {/* Add four more fields here */}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end mt-4">
          
            <button
              type="submit"
              onClick={()=>setUpdate(!update)}
              className="bg-primary text-white py-2 px-4 rounded-md mr-2"
            >
              Update
            </button>
            {update &&
            <button
            type="button"
              onClick={()=>setUpdate(!update)}
              className="bg-secondary text-white hover:bg-black py-2 px-4 rounded-md mr-2"
            >
            Cancel
            </button>
            }
            <button
              type="button"
              className="bg-red-500 text-white hover:bg-red-600 py-2 px-4 rounded-md"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    );
  };
  const EditableForm = () => {
    // State to manage whether the form is in edit mode
    const [editing, setEditing] = useState(false);
  
    // Sample data (replace with your actual data)
    const [formData, setFormData] = useState({
      field1: 'Value 1',
      field2: 'Value 2',
      field3: 'Value 3',
      field4: 'Value 4',
      field5: 'Value 5',
      field6: 'Value 6',
      field7: 'Value 7',
      field8: 'Value 8',
      field9: 'Value 9',
      field10: 'Value 10',
    });
  
    // Function to toggle edit mode
    const toggleEdit = () => {
      setEditing(!editing);
    };
  
    // Function to handle form input changes
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    // Function to handle form submission (you can implement this as needed)
    const handleSubmit = (e) => {
      e.preventDefault();
      // Add your logic for submitting the edited data here
      toggleEdit(); // Exit edit mode after submitting
    };
  
    return (
      <div className="bg-#00B894 p-4">
        <form className="bg-white rounded-lg p-8 shadow-md" onSubmit={handleSubmit}>
          <h2 className="text-2xl text-center mb-4">Data Form</h2>
          
          <div className="grid grid-cols-2 gap-4">
            {Object.keys(formData).map((fieldName) => (
              <div key={fieldName}>
                {editing ? (
                  <input
                    type="text"
                    name={fieldName}
                    value={formData[fieldName]}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    placeholder={fieldName}
                    required
                  />
                ) : (
                  <div className="mb-2">
                    <strong>{fieldName}:</strong> {formData[fieldName]}
                  </div>
                )}
              </div>
            ))}
          </div>
  
          {/* Edit button */}
          <div className="text-center mt-4">
            {editing ? (
              <button
                type="submit"
                className="bg-#00B894 text-white hover:bg-#002f5f py-2 px-4 rounded-md"
              >
                Update
              </button>
            ) : (
              <button
                type="button"
                onClick={toggleEdit}
                className="bg-#002f5f text-white hover:bg-#00B894 py-2 px-4 rounded-md"
              >
                Edit
              </button>
            )}
          </div>
        </form>
      </div>
    );
  };

  useEffect(() => {
    FetchAllApplications();
    FetchAllAgentMembers();
  }, [selectedRows, Assigned]);
  const FetchAllApplications = async () => {
    axios
      .get(
        `https://studyapi.ieodkv.com/applications/${Assigned ? "" : "empty"}`
      )
      .then((response) => {
        if (response.data) {
          setApplicationData(response.data);
        }
        console.log("All Application", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const FetchAllAgentMembers = async () => {
    axios
      .get(`https://studyapi.ieodkv.com/members/staff`)
      .then((response) => {
        if (response.data.length > 0) {
          setAgents(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const askHandleDelete = (userId) =>
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(userId);
      }
    });
  const handleDelete = (id) => {
    console.log("Id from handleDelete", id);
    axios
      .delete(`https://studyapi.ieodkv.com/applications/${id}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });

    setApplicationData(applications.filter((el) => el._id !== id));
    setPopupshow(true);
    setPopupText("Application Deleted");
    setTimeout(() => {
      setPopupshow(false);
    }, 2000);
  };
  const askHandleDeleteSelectedRows = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        HandleDeleteSelectedRows();
        FetchAllApplications();
      }
    });
  };
  const HandleDeleteSelectedRows = async () => {
    selectedRows.forEach((row) => {
      axios
        .delete("https://studyapi.ieodkv.com/applications/" + row)
        .then((response) => {
          setApplicationData(response.data);
          setPopupshow(true);
          setPopupText(`${selectedRows.length} applications Deleted`);
          if (response.status === 200) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          }
        });
    });
    setTimeout(() => {
      setPopupshow(false);
    }, 2000);
    setSelectedRows([]);
    FetchAllApplications();
  };
  const handleAddCore = async () => {
    console.log(coreName);
    try {
      const response = await axios.post(
        "https://studyapi.ieodkv.com/core-settings",
        {
          name: coreName,
        }
      );
      console.log(response.data);
      setModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAssignApplication = async (event, agentId) => {
    try {
      const selectedAgentFromList = JSON.parse(event.target.value);
      const agentId = selectedAgentFromList._id;

      console.log("Agent ID", agentId);
      setAgentId(selectedAgentFromList._id);
      // console.log("SelectedAgent", selectedAgentFromList,)
      // console.log("SelectedApplication", applicationId,)
      const message = `You wanna assign the <span class="font-bold">${applicationId.firstname}</span> application to the agent <span class="font-bold">${selectedAgentFromList.username}</span>!`;

      // In your JSX component, use dangerouslySetInnerHTML to render the message with HTML

      Swal.fire({
        title: "Are you sure?",
        html: `You wanna assign the ${applicationId.firstname} application to the <b> Agent  ${selectedAgentFromList.username} </b>! `,
        icon: "info",

        showCancelButton: true,
        confirmButtonColor: "#00B894",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, I'm Sure!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await axios.patch(
            `https://studyapi.ieodkv.com/applications/update_row_table/${applicationId._id}`,
            {
              case_owner: selectedAgentFromList,
              current_desk: selectedAgentFromList,
            }
          );
          console.log(response.data, response.status);
          await FetchAllApplications();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleViewApplication = async (data) => {
    console.log("data is me ", data);
    try {
      setApplicationModal(true);
      setApplicationModalData(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRowClick = (row) => {
    setApplicationID(row);
    console.log(`Row with ID ${row._id} clicked.`);
    // You can add your custom logic here
  };
  const handleSelectAll = () => {
    if (selectedRows.length === applications.length) {
      setSelectedRows([]);
    } else {
      const allRowIds = applications.map((row) => row._id);
      setSelectedRows(allRowIds);
    }
  };
  return (
    <div className="datatable">
      <Transition.Root show={Open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setModalOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary sm:mx-0 sm:h-10 sm:w-10">
                        <HiOutlineViewGridAdd
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Add Core
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Just enter a core name to create a new core, and
                            press create button
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover: sm:ml-3 sm:w-auto"
                      onClick={() => handleAddCore()}
                    >
                      Create Core
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setModalOpen(false)}
                      // ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="datatableTitleWrap">
        <div className="datatableTitle">Template</div>
        <Switcher13 />
        {selectedRows.length > 0 ? (
          <button
            className="delete_btn"
            onClick={() => {
              askHandleDeleteSelectedRows();
            }}
          >
            <MdDelete size={24} /> Delete Selected Rows
          </button>
        ) : null}
      </div>
      {popUpShow ? (
        <div className="Popupmodal">
          <div
            className="popupInner"
            style={
              popUpShow && popUpText === "Category Added"
                ? {
                    backgroundColor: "#8AFF8A",
                    borderWidth: 1,
                    borderColor: "#007500",
                  }
                : { backgroundColor: "red", borderWidth: 1, borderColor: "red" }
            }
          >
            <PopupAlert popUpText={popUpText} />
          </div>
        </div>
      ) : (
        ""
      )}


      {/* Here is the table  */}
      <CustomTable data={applications} />

      {/*Add form  */}
      <AddForm />

      {/* Update Form */}
      <UpdateFormData />
    </div>

);
};

export default DatatableTemplate;
