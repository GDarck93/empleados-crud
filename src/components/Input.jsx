import React from 'react'

const Input = (props) => {
    const { value, name, label, type, handleInput, className } = props;

    if (type === "file") {
        return (
            <div className="mb-2">
                <label
                    className="block mb-1.5 font-semibold text-gray-700"
                    htmlFor={name}
                >
                    {label}
                </label>
                <label
                    htmlFor={name}
                    className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg px-3 py-6 w-full cursor-pointer bg-gray-50 hover:bg-blue-50 transition"
                >
                    <span className="text-gray-500">Selecciona una imagen...</span>
                    <input
                        type="file"
                        name={name}
                        id={name}
                        accept="image/*"
                        onChange={handleInput}
                        className="hidden"
                    />
                </label>
            </div>
        );
    }

    return (
        <div className="mb-2">
            <label
                className="block mb-1.5 font-semibold text-gray-700"
                htmlFor={name}
            >
                {label}
            </label>
            <input
                id='{name}'
                type={type}
                placeholder={`Ingrese ${label}`}
                name={name}
                value={value[name]}
                onChange={handleInput}
                className={
                    className
                        ? className
                        : 'border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 shadow-sm'
                }
            />
        </div>
    )
}

export default Input