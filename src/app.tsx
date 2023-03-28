import * as React from "react";
import { DataGrid, GridToolbarFilterButton } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import { ratingOnlyOperators } from "./rating";
import { nameOnlyOperators } from "./name";

const VISIBLE_FIELDS = ["name", "rating", "country", "dateCreated", "isAdmin"];

function CustomFiltersOperator() {
  const { data } = useDemoData({
    dataSet: "Employee",
    visibleFields: VISIBLE_FIELDS,
    rowLength: 100,
  });

  const mapColumns = (columns: any) => {
    return columns.map((col: any) => {
      if (col.field === "rating") {
        return {
          ...col,
          filterOperators: ratingOnlyOperators,
        };
      }
      if (col.field === "name") {
        return {
          ...col,
          filterOperators: nameOnlyOperators,
        };
      }
      return col;
    });
  };
  const columns = React.useMemo(() => mapColumns(data.columns), [data.columns]);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        {...data}
        columns={columns}
        slots={{
          toolbar: GridToolbarFilterButton,
        }}
        initialState={{
          ...data.initialState,
          filter: {
            ...data.initialState?.filter,
            filterModel: {
              items: [
                {
                  id: 1,
                  field: "rating",
                  value: "3.5",
                  operator: "above",
                },
              ],
            },
          },
        }}
      />
    </div>
  );
}

export const App = CustomFiltersOperator;
