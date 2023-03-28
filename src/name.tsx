import * as React from "react";
import { TextField, Box, TextFieldProps } from "@mui/material";
import {
  GridFilterInputValueProps,
  GridFilterItem,
  GridFilterOperator,
} from "@mui/x-data-grid";

function NameInputValue(props: GridFilterInputValueProps) {
  const { item, applyValue, focusElementRef } = props;
  const nameRef: React.Ref<any> = React.useRef(null);

  React.useImperativeHandle(focusElementRef, () => ({
    focus: () => {
      nameRef.current
        .querySelector(`input[value="${item.value ? String(item.value) : ""}"]`)
        .focus();
    },
  }));

  const handleNameFilterChange: TextFieldProps["onChange"] = (event) => {
    applyValue({ ...item, value: event.target.value });
  };
  console.log("item", item);
  console.log("item.value", item.value);
  return (
    <Box
      sx={{
        display: "inline-flex",
        flexDirection: "row",
        alignItems: "center",
        height: 48,
        pl: "20px",
      }}
    >
      <TextField
        name="custom-name-filter-operator"
        placeholder="Filter value"
        onChange={handleNameFilterChange}
        value={item.value || ""}
        ref={nameRef}
      />
    </Box>
  );
}

export const nameOnlyOperators: GridFilterOperator[] = [
  {
    label: "Contains",
    value: "contains",
    getApplyFilterFn: (filterItem: GridFilterItem) => {
      if (!filterItem.field || !filterItem.value || !filterItem.operator) {
        return null;
      }

      return (params): boolean => {
        return String(params.value).includes(String(filterItem.value));
      };
    },
    InputComponent: NameInputValue,
    InputComponentProps: { type: "string" },
    getValueAsString: (value: string) => `${value}`,
  },
];
