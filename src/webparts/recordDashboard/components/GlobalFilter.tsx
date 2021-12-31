import * as React from "react";

export const GlobalFilter = ({ searchText, filter, setFilter }) => {
    return (
        <div className="row form-group">
            <span className="col-sm-6 col-md-5 col-lg-4">
                <label className="form-label col-md-2">{searchText} </label>

                <input className="form-control col-md-3" value={filter || ''} onChange={(e) => setFilter(e.target.value)} />

            </span>

        </div>

    )
}
