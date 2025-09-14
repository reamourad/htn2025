import React, { useState } from 'react';

const Settings = () => {
    const [newBusiness, setNewBusiness] = useState(true);
    const [renewalBusiness, setRenewalBusiness] = useState(false);
    const [propertyLOB, setPropertyLOB] = useState(true);
    const [otherLOB, setOtherLOB] = useState(false);
    const [tivAcceptableMin, setTivAcceptableMin] = useState(0);
    const [tivAcceptableMax, setTivAcceptableMax] = useState(150);
    const [tivTargetMin, setTivTargetMin] = useState(50);
    const [tivTargetMax, setTivTargetMax] = useState(100);
    const [premiumAcceptableMin, setPremiumAcceptableMin] = useState(50);
    const [premiumAcceptableMax, setPremiumAcceptableMax] = useState(175);
    const [premiumTargetMin, setPremiumTargetMin] = useState(75);
    const [premiumTargetMax, setPremiumTargetMax] = useState(100);
    const [buildingAgeNewer, setBuildingAgeNewer] = useState(1990);
    const [buildingAgeTarget, setBuildingAgeTarget] = useState(2010);
    const [lossValue, setLossValue] = useState(100);
    const [output, setOutput] = useState(null);

    const acceptableStates = ["OH", "PA", "MD", "CO", "CA", "FL", "NC", "SC", "GA", "VA", "UT"];
    const targetStates = ["OH", "PA", "MD", "CO", "CA", "FL"];

    const acceptableConstructionTypes = ["Frame", "Joisted Masonry", "Non Combustible", "Masonry Non Combustible", "Fire Resistive"];

    const [selectedStates, setSelectedStates] = useState([]);
    const [selectedConstructionTypes, setSelectedConstructionTypes] = useState([]);

    const handleStateClick = (state) => {
        setSelectedStates(prevSelected =>
            prevSelected.includes(state)
                ? prevSelected.filter(s => s !== state)
                : [...prevSelected, state]
        );
    };
    const handleConstructionTypeClick = (type) => {
        setSelectedConstructionTypes(prevSelected =>
            prevSelected.includes(type)
                ? prevSelected.filter(t => t !== type)
                : [...prevSelected, type]
        );
    };
    const updateSettings = () => {
        const settings = {
            submissionType: {
                newBusiness,
                renewalBusiness,
            },
            lineOfBusiness: {
                property: propertyLOB,
                other: otherLOB,
            },
            primaryRiskState: {
                acceptable: selectedStates,
                target: selectedStates.filter(state => targetStates.includes(state)),
            },
            tivLimits: {
                acceptableMin: parseFloat(tivAcceptableMin),
                acceptableMax: parseFloat(tivAcceptableMax),
                targetMin: parseFloat(tivTargetMin),
                targetMax: parseFloat(tivTargetMax),
            },
            totalPremium: {
                acceptableMin: parseFloat(premiumAcceptableMin),
                acceptableMax: parseFloat(premiumAcceptableMax),
                targetMin: parseFloat(premiumTargetMin),
                targetMax: parseFloat(premiumTargetMax),
            },
            buildingAge: {
                acceptableNewerThan: parseInt(buildingAgeNewer),
                targetNewerThan: parseInt(buildingAgeTarget),
            },
            constructionType: {
                acceptable: selectedConstructionTypes,
            },
            lossValue: {
                lessThan: parseFloat(lossValue),
            },
        };
        setOutput(settings);
        // Send settings to backend
        fetch("http://127.0.0.1:8000/save_settings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(settings),
        })
            .then((res) => res.json())
            .then((data) => {
            console.log("Backend confirmed settings:", data);
            })
            .catch((err) => console.error("Error sending settings:", err));
        };

    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen p-4 md:p-8">
            <div className="max-w-4xl bg-white shadow-xl rounded-lg p-6 w-full mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Business Rule Configuration</h1>

                <form className="space-y-6">
                    {/* Submission Type */}
                    <div className="form-control">
                        <label className="label font-bold">Submission Type</label>
                        <div className="flex flex-col gap-2">
                            <label className="label cursor-pointer justify-start gap-4">
                                <input
                                    type="checkbox"
                                    id="newBusiness"
                                    className="checkbox checkbox-primary"
                                    checked={newBusiness}
                                    onChange={(e) => setNewBusiness(e.target.checked)}
                                />
                                <span className="label-text">New Business: Acceptable</span>
                            </label>
                            <label className="label cursor-pointer justify-start gap-4">
                                <input
                                    type="checkbox"
                                    id="renewalBusiness"
                                    className="checkbox checkbox-primary"
                                    checked={renewalBusiness}
                                    onChange={(e) => setRenewalBusiness(e.target.checked)}
                                />
                                <span className="label-text">Renewal Business: Not Acceptable</span>
                            </label>
                        </div>
                    </div>

                    {/* Line of Business */}
                    <div className="form-control">
                        <label className="label font-bold">Line of Business</label>
                        <div className="flex flex-col gap-2">
                            <label className="label cursor-pointer justify-start gap-4">
                                <input
                                    type="checkbox"
                                    id="propertyLOB"
                                    className="checkbox checkbox-primary"
                                    checked={propertyLOB}
                                    onChange={(e) => setPropertyLOB(e.target.checked)}
                                />
                                <span className="label-text">Property Line: Acceptable</span>
                            </label>
                            <label className="label cursor-pointer justify-start gap-4">
                                <input
                                    type="checkbox"
                                    id="otherLOB"
                                    className="checkbox checkbox-primary"
                                    checked={otherLOB}
                                    onChange={(e) => setOtherLOB(e.target.checked)}
                                />
                                <span className="label-text">Other Lines: Not Acceptable</span>
                            </label>
                        </div>
                    </div>

                    {/* Primary Risk State */}
                    <div className="form-control">
                        <label className="label font-bold">Primary Risk State</label>
                        <div className="flex flex-wrap gap-2">
                            {acceptableStates.map(state => {
                                const isTarget = targetStates.includes(state);
                                const isSelected = selectedStates.includes(state);
                                return (
                                    <span
                                        key={state}
                                        className={`badge badge-lg cursor-pointer transition-colors ${isSelected ? 'badge-primary' : 'badge-outline'} ${isTarget ? 'badge-warning' : ''}`}
                                        onClick={() => handleStateClick(state)}
                                    >
                                        {state}
                                    </span>
                                );
                            })}
                        </div>
                    </div>

                    {/* TIV Limits */}
                    <div className="form-control">
                        <label className="label font-bold">TIV Limits (in millions)</label>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2">
                                <span className="label-text">Acceptable:</span>
                                <input
                                    type="number"
                                    id="tivAcceptableMin"
                                    className="input input-bordered input-xs w-20"
                                    value={tivAcceptableMin}
                                    onChange={(e) => setTivAcceptableMin(e.target.value)}
                                />
                                <span className="label-text">-</span>
                                <input
                                    type="number"
                                    id="tivAcceptableMax"
                                    className="input input-bordered input-xs w-20"
                                    value={tivAcceptableMax}
                                    onChange={(e) => setTivAcceptableMax(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="label-text">Target:</span>
                                <input
                                    type="number"
                                    id="tivTargetMin"
                                    className="input input-bordered input-xs w-20"
                                    value={tivTargetMin}
                                    onChange={(e) => setTivTargetMin(e.target.value)}
                                />
                                <span className="label-text">-</span>
                                <input
                                    type="number"
                                    id="tivTargetMax"
                                    className="input input-bordered input-xs w-20"
                                    value={tivTargetMax}
                                    onChange={(e) => setTivTargetMax(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Total Premium */}
                    <div className="form-control">
                        <label className="label font-bold">Total Premium (in thousands)</label>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2">
                                <span className="label-text">Acceptable:</span>
                                <input
                                    type="number"
                                    id="premiumAcceptableMin"
                                    className="input input-bordered input-xs w-20"
                                    value={premiumAcceptableMin}
                                    onChange={(e) => setPremiumAcceptableMin(e.target.value)}
                                />
                                <span className="label-text">-</span>
                                <input
                                    type="number"
                                    id="premiumAcceptableMax"
                                    className="input input-bordered input-xs w-20"
                                    value={premiumAcceptableMax}
                                    onChange={(e) => setPremiumAcceptableMax(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="label-text">Target:</span>
                                <input
                                    type="number"
                                    id="premiumTargetMin"
                                    className="input input-bordered input-xs w-20"
                                    value={premiumTargetMin}
                                    onChange={(e) => setPremiumTargetMin(e.target.value)}
                                />
                                <span className="label-text">-</span>
                                <input
                                    type="number"
                                    id="premiumTargetMax"
                                    className="input input-bordered input-xs w-20"
                                    value={premiumTargetMax}
                                    onChange={(e) => setPremiumTargetMax(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Building Age */}
                    <div className="form-control">
                        <label className="label font-bold">Building Age</label>
                        <div className="space-y-4">
                            <div>
                                <label className="label-text block mb-1">Acceptable (Newer Than)</label>
                                <input
                                    type="number"
                                    id="buildingAgeNewer"
                                    className="input input-bordered w-24"
                                    value={buildingAgeNewer}
                                    onChange={(e) => setBuildingAgeNewer(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="label-text block mb-1">Target (Newer Than)</label>
                                <input
                                    type="number"
                                    id="buildingAgeTarget"
                                    className="input input-bordered w-24"
                                    value={buildingAgeTarget}
                                    onChange={(e) => setBuildingAgeTarget(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Construction Type */}
                    <div className="form-control">
                        <label className="label font-bold">Construction Type</label>
                        <div className="flex flex-wrap gap-2">
                            {acceptableConstructionTypes.map(type => {
                                const isSelected = selectedConstructionTypes.includes(type);
                                return (
                                    <span
                                        key={type}
                                        className={`badge badge-lg cursor-pointer transition-colors ${isSelected ? 'badge-primary' : 'badge-outline'}`}
                                        onClick={() => handleConstructionTypeClick(type)}
                                    >
                                        {type}
                                    </span>
                                );
                            })}
                        </div>
                    </div>

                    {/* Loss Value */}
                    <div className="form-control">
                        <label className="label font-bold">Loss Value (in thousands)</label>
                        <div className="flex items-center gap-4">
                            <label className="label-text block mb-1">Less Than</label>
                            <input
                                type="number"
                                id="lossValue"
                                className="input input-bordered w-24"
                                value={lossValue}
                                onChange={(e) => setLossValue(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="divider"></div>

                    <div className="flex justify-center">
                        <button type="button" onClick={updateSettings} className="btn btn-primary btn-lg">Update Settings</button>
                    </div>
                </form>

                {output && (
                    <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Current Rule Values</h2>
                        <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">{JSON.stringify(output, null, 2)}</pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Settings;