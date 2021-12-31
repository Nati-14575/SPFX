import * as React from "react";

export const GlobalFilter = ({ searchText, filter, setFilter }) => {
    return (
        <div className="row form-group">
            <span className="col-sm-6 col-md-5 col-lg-4">
                <label className="form-label">{searchText} :
                   <input className="form-control" value={filter || ''} onChange={(e) => setFilter(e.target.value)} />
                </label>

               

            </span>

        </div>

    )
}
