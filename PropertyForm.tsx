import React, { useState } from 'react';

const PropertyForm: React.FC = () => {
    const [propertyInfo, setPropertyInfo] = useState({
        ownerName: '',
        propertyAddress: '',
        propertyValue: '',
        taxAssessment: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPropertyInfo({
            ...propertyInfo,
            [name]: value
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Call the AI service to process the property information
        // processPropertyInfo(propertyInfo);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Owner Name:
                    <input
                        type="text"
                        name="ownerName"
                        value={propertyInfo.ownerName}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Property Address:
                    <input
                        type="text"
                        name="propertyAddress"
                        value={propertyInfo.propertyAddress}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Property Value:
                    <input
                        type="number"
                        name="propertyValue"
                        value={propertyInfo.propertyValue}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Tax Assessment:
                    <input
                        type="number"
                        name="taxAssessment"
                        value={propertyInfo.taxAssessment}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default PropertyForm;