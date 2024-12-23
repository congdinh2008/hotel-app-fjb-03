import { faEdit, faEraser, faPlus, faSave, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const AmenityDetail = () => {
    useEffect(() => {
    }, []);

    const onSubmit = (event: any) => {
        event.preventDefault();
        console.log('Save data');
    };

    return (
        <div className="card border border-slate-300 rounded-md my-3">
            <div className="card-header p-3">
                <h1 className="text-2xl font-bold">Create/Edit Amenity</h1>
            </div>
            <form onSubmit={onSubmit}>
                <div className="card-body border-y border-slate-300 p-3">
                    Form Edit or Create
                </div>
                <div className="card-footer p-3 flex justify-end">
                    <button type="reset" className="p-2 px-4 bg-slate-200 rounded-full hover:bg-slate-300">
                        <FontAwesomeIcon icon={faEraser} className="mr-2" /> Reset
                    </button>
                    <button type="submit" className="p-2 px-4 bg-blue-500 rounded-full text-white hover:bg-blue-700">
                        <FontAwesomeIcon icon={faSave} className="mr-2" /> Save
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AmenityDetail;