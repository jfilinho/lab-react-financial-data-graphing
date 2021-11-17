import { useState } from "react"


function FilterDate(props) {
    const [formDate, setFormDate] = useState({
        initialDate: "",
        finalDate: "",
        currency: "USD",
    });

    function handleChange(e) {
        let value = e.target.value;
        let valueOpt = e.target.option;
        setFormDate({ ...formDate, [e.target.name]: value || valueOpt });
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.setData(formDate);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="d-flex w-75 m-3 mt-3">
                <input
                    name="initialDate"
                    value={formDate.initialDate}
                    className="form-control me-3"
                    type="date"
                    onChange={handleChange}
                />
                <input
                    name="finalDate"
                    value={formDate.finalDate}
                    className="form-control"
                    type="date"
                    onChange={handleChange}
                />
            </div>
            <div className="input-group mb-3 w-75 d-flex">
                <div>
                    <select class="form-control" name="currency" onChange={handleChange}>
                        <option value="USD" selected>
                            USD
                        </option>
                        <option value="EUR">EUR</option>
                        <option value="BRL">BRL</option>
                    </select>
                </div>
                <div>
                    <button type="submit" className="button p-1 mf-1">
                        Filtrar
                    </button>
                </div>
            </div>
        </form>
    );
}

export default FilterDate;
