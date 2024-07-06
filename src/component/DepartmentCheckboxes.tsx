import React, { useState } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

// Hardcoded JSON for departments and sub-departments
const departmentsData = [
  {
    department: "customer_service",
    sub_departments: ["support", "customer_success"],
  },
  {
    department: "design",
    sub_departments: ["graphic_design", "product_design", "web_design"],
  },
];

const DepartmentCheckboxes: React.FC = () => {
  const [expandedDepartments, setExpandedDepartments] = useState<{
    [key: string]: boolean;
  }>({});
  const [selectedDepartments, setSelectedDepartments] = useState<{
    [key: string]: boolean;
  }>({});
  const [selectedSubDepartments, setSelectedSubDepartments] = useState<{
    [key: string]: { [key: string]: boolean };
  }>({});

  const handleToggleDepartment = (department: string) => {
    setExpandedDepartments((prev) => ({
      ...prev,
      [department]: !prev[department],
    }));
  };

  const handleDepartmentChange = (department: string) => {
    const newSelected = !selectedDepartments[department];
    setSelectedDepartments((prev) => ({
      ...prev,
      [department]: newSelected,
    }));
    setSelectedSubDepartments((prev) => ({
      ...prev,
      [department]:
        departmentsData
          .find((d) => d.department === department)
          ?.sub_departments.reduce((acc, sub) => {
            acc[sub] = newSelected;
            return acc;
          }, {} as { [key: string]: boolean }) || {},
    }));
  };

  const handleSubDepartmentChange = (
    department: string,
    subDepartment: string
  ) => {
    const newSelected = !selectedSubDepartments[department][subDepartment];
    const newSelectedSubDepartments = {
      ...selectedSubDepartments,
      [department]: {
        ...selectedSubDepartments[department],
        [subDepartment]: newSelected,
      },
    };
    setSelectedSubDepartments(newSelectedSubDepartments);

    const allSelected = Object.values(
      newSelectedSubDepartments[department]
    ).every((selected) => selected);
    setSelectedDepartments((prev) => ({
      ...prev,
      [department]: allSelected,
    }));
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Departments
      </Typography>
      {departmentsData.map((department) => (
        <Box key={department.department}>
          <Box display="flex" alignItems="center">
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedDepartments[department.department] || false}
                  onChange={() => handleDepartmentChange(department.department)}
                />
              }
              label={department.department}
            />
            <IconButton
              onClick={() => handleToggleDepartment(department.department)}
            >
              {expandedDepartments[department.department] ? (
                <ExpandLessIcon />
              ) : (
                <ExpandMoreIcon />
              )}
            </IconButton>
          </Box>
          {expandedDepartments[department.department] && (
            <Box marginLeft={4}>
              {department.sub_departments.map((subDepartment) => (
                <FormControlLabel
                  key={subDepartment}
                  control={
                    <Checkbox
                      checked={
                        selectedSubDepartments[department.department]?.[
                          subDepartment
                        ] || false
                      }
                      onChange={() =>
                        handleSubDepartmentChange(
                          department.department,
                          subDepartment
                        )
                      }
                    />
                  }
                  label={subDepartment}
                />
              ))}
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default DepartmentCheckboxes;
