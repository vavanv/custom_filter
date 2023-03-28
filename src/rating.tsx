import * as React from "react";
import Box from "@mui/material/Box";
import Rating, { RatingProps } from "@mui/material/Rating";
import {
  GridFilterInputValueProps,
  GridFilterItem,
  GridFilterOperator,
} from "@mui/x-data-grid";

function RatingInputValue(props: GridFilterInputValueProps) {
  const { item, applyValue, focusElementRef } = props;
  const ratingRef: React.Ref<any> = React.useRef(null);

  React.useImperativeHandle(focusElementRef, () => ({
    focus: () => {
      ratingRef.current
        .querySelector(`input[value="${Number(item.value) || ""}"]`)
        .focus();
    },
  }));

  const handleRatingFilterChange: RatingProps["onChange"] = (
    event,
    newValue
  ) => {
    applyValue({ ...item, value: newValue });
  };

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
      <Rating
        name="custom-rating-filter-operator"
        placeholder="Filter value"
        value={Number(item.value)}
        onChange={handleRatingFilterChange}
        precision={0.5}
        ref={ratingRef}
      />
    </Box>
  );
}

export const ratingOnlyOperators: GridFilterOperator[] = [
  {
    label: "Above",
    value: "above",
    getApplyFilterFn: (filterItem: GridFilterItem) => {
      if (!filterItem.field || !filterItem.value || !filterItem.operator) {
        return null;
      }

      return (params): boolean => {
        return Number(params.value) >= Number(filterItem.value);
      };
    },
    InputComponent: RatingInputValue,
    InputComponentProps: { type: "number" },
    getValueAsString: (value: number) => `${value} Stars`,
  },
];
