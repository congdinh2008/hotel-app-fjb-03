import { faEdit, faEraser, faPlus, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import AmenityDetail from "./AmenityDetail";

const AmenityList = () => {
    const [data, setData] = useState<any[]>([]);
    const [isShowDetail, setIsShowDetail] = useState<boolean>(false);

    useEffect(() => {
        searchData();
    }, []);

    const searchData = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/amenities');
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.log('Failed to fetch data', error);
        }
    };

    const onCreate = () => {
        setIsShowDetail(true);

    };

    const onSearch = () => {
        console.log('Search data');
    };

    const onEdit = (item: any) => {
        setIsShowDetail(true);
    }

    const onDelete = async (item: any) => {
        try {
            const response = await fetch(`http://localhost:8080/api/amenities/${item.id}`, { method: 'DELETE' });
            const data = await response.json();
            if (data) {
                searchData();
            } else {
                console.log('Failed to delete data', data);
            }
        } catch (error) {
            console.log('Failed to delete data', error);
        }
    }
    return (
        <section>
            {/* Search Header */}
            <div className="card border border-slate-300 rounded-md">
                <div className="card-header p-3">
                    <h1 className="text-2xl font-bold">Amenity Management</h1>
                </div>
                <form>
                    <div className="card-body border-y border-slate-300 p-3">
                        form search
                    </div>
                    <div className="card-footer p-3 flex justify-between">
                        <button type="button" className="p-2 px-4 bg-green-500 rounded-full text-white hover:bg-green-700" onClick={onCreate}>
                            <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add
                        </button>
                        <div className="search-actions space-x-3">
                            <button type="reset" className="p-2 px-4 bg-slate-200 rounded-full hover:bg-slate-300">
                                <FontAwesomeIcon icon={faEraser} className="mr-2" /> Reset
                            </button>
                            <button type="submit" className="p-2 px-4 bg-blue-500 rounded-full text-white hover:bg-blue-700" onClick={onSearch}>
                                <FontAwesomeIcon icon={faSearch} className="mr-2" /> Search
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Table List Data */}
            <div className="card border border-slate-300 rounded-md my-3">
                <div className="card-body border-y border-slate-300 p-3">
                    <table className="w-full">
                        <thead>
                            <tr className="*:border *:border-slate-300 *:p-2">
                                <th>No</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? data.map((item, index) => (
                                <tr key={item.id} className="*:border *:border-slate-300 *:p-2">
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        <button type="button" title="Edit" onClick={() => onEdit(item)}>
                                            <FontAwesomeIcon icon={faEdit} className="text-blue-500 mr-2" />
                                        </button>
                                        <button type="button" title="Delete" onClick={() => onDelete(item)}>
                                            <FontAwesomeIcon icon={faTrash} className="text-red-500 mr-2" />
                                        </button>
                                    </td>
                                </tr>
                            )) : <tr><td colSpan={4} className="border border-slate-300 p-2 text-center">No data</td></tr>}
                        </tbody>
                    </table>
                </div>
                <div className="card-footer pagination">
                    Pagination
                </div>
            </div>

            {/* Form Details - Edit/Create Amenity */}
            {isShowDetail && <AmenityDetail />}
        </section>
    );
}

export default AmenityList;