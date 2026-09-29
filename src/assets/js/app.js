const app = {

    data: [],

    mode: "guided",

    filters: getDefaultFilters(),

    guide: {
        currentStep: 0
    }

};

function getDefaultFilters() {
    return {
        category: "All districts",
        district: "--",
        highlight: "all",
        showOnly: false,
        regression: false,
        shapes: []
    };
}

const modeButtons =
    document.querySelectorAll(
        'input[name="mode"]'
    );

const districtSelect = document.getElementById('district');
const categorySelect = document.getElementById('categories');
const showOnlyCheckbox = document.querySelector('input[type="checkbox"]');
const clearButton = document.getElementById('clear');
const stepIndicator = document.getElementById('step-indicator');
const nextButton = document.getElementById('next-step');
const previousButton = document.getElementById('previous-step');

const css = getComputedStyle(document.documentElement);
const colors = {

    light:
        css.getPropertyValue("--light").trim(),

    dark:
        css.getPropertyValue("--dark").trim(),
    
    grey:
        css.getPropertyValue("--grey").trim(),

    blue:
        css.getPropertyValue("--blue").trim(),

    green:
        css.getPropertyValue("--green").trim(),
        
    gold:
        css.getPropertyValue("--gold").trim(),
        
    orange:
        css.getPropertyValue("--orange").trim(),
        
    coral:
        css.getPropertyValue("--coral").trim()
};

const performance_groups = [
    "Top 10%",
    "Top 11-20%",
    "Middle 60%",
    "Bottom 11-20%",
    "Bottom 10%"
];

const layout = {
    // title: {text: 'Minnesota Elementary Schools: Reading Proficiency vs. Poverty'},

    xaxis: {
        title: {
            text: 'Poverty (percent Free and Reduced-Price Lunch)'
        },

        range: [0, 100],

        tick0: 0,
        dtick: 10,
        ticksuffix: '%',

        showgrid: true,
        gridwidth: 1,
        zeroline: false,
        fixedrange: true
    },

    yaxis: {
        title: {
            text: 'Percent Proficient in MCA Reading'
        },

        range: [0, 100],

        tick0: 0,
        dtick: 20,
        ticksuffix: '%',

        showgrid: true,
        gridwidth: 1,
        zeroline: false,
        fixedrange: true
    },
    showlegend: false,
    shapes: [],
    annotations: []
};

async function loadData() {
    const response = await fetch('mn_plot.json');
    app.data = await response.json();

    init();
}

function init() {

    document.querySelector(
        `input[name="mode"][value="${app.mode}"]`
    ).checked = true;
    updateMode();

    categorySelect.selectedIndex = 0;
    updateDistrictDropdown();
    showOnlyCheckbox.checked = false;
    updatePlot();
}

function updateMode() {
    if (app.mode === "guided") {
        document.body.classList.remove(
            "explore-mode"
        );
        showGuideStep(app.guide.currentStep);
    }
    else {
        document.body.classList.add(
            "explore-mode"
        );
    }
}

function applyFilters(filters) {

    app.filters = {
        ...getDefaultFilters(),
        ...structuredClone(filters)
    };

    syncControls();
    updatePlot();
}

function showGuideStep(index) {

    console.log(`Showing guide index ${index}`);

    const step = guide[index];

    app.guide.currentStep = index;

    app.guide.currentHoverSchools = step.hoverSchools ?? [];

    applyFilters(step.filters);

    document.querySelector("#guide-title")
        .textContent = step.title;

    document.querySelector("#guide-text")
        .innerHTML = step.text;

    updateStepIndicator();
}

function updateStepIndicator() {

    stepIndicator.textContent =
        `${app.guide.currentStep + 1} of ${guide.length}`;

}

function getPlotData() {

    const categoryData = getCategoryData();

    const district = app.filters.district;
    const showOnly = app.filters.showOnlyDistrict;
    const highlight = app.filters.highlight;

    if (highlight === "all") {

        return {
            background: [],
            highlighted: categoryData
        };

    }

    if (
        highlight === "none" ||
        district === "All districts" ||
        district === "--"
    ) {

        return {
            background: categoryData,
            highlighted: []
        };

    }

    const highlighted =
        categoryData.filter(d =>
            d["District Name"] === district
        );

    const background =
        showOnly
            ? []
            : categoryData.filter(d =>
                d["District Name"] !== district
            );

    return {
        background,
        highlighted
    };



    // if (
    //     district === 'All districts' ||
    //     district === '--'
    // ) {
    //     return {
    //         background: categoryData,
    //         highlighted: []
    //     };
    // }

    // const highlighted =
    //     categoryData.filter(d =>
    //         d["District Name"] === district
    //     );

    // const background =
    //     showOnly
    //         ? []
    //         : categoryData.filter(d =>
    //             d["District Name"] !== district
    //         );

    // return {
    //     background,
    //     highlighted
    // };
}

function updatePlot() {

    const plotData = getPlotData();

    const traces = [];

    layout.title = {text:
        'Minnesota Elementary Schools: Reading Proficiency vs Poverty<br>' +
        `<span style="font-size:16px;color:#666;">${getPlotTitle()}</span>`}

    // if (plotData.background.length > 0) {

    //     addTrace(
    //         traces,
    //         plotData.background,
    //         {

    //             color: colors.grey,

    //             opacity: 0.50,

    //             size: 8,

    //             name: "Other districts"

    //         }
    //     );

    // }

    addBackgroundTrace(
        traces,
        plotData.background
    );

    addHighlightedTraces(
        traces,
        plotData.highlighted
    );

    // for (const group of RESIDUAL_GROUPS) {

    //     const schools =
    //         plotData.highlighted.filter(
    //             d => d.resid_group === group.name
    //         );

    //     if (schools.length === 0)
    //         continue;

    //     addTrace(
    //         traces,
    //         schools,
    //         {

    //             color: group.color,

    //             opacity: 0.80,

    //             size: 10,

    //             name: group.name

    //         }
    //     );

    // }

    if (app.filters.regression) {
        addRegressionTrace(
            traces,
            getCategoryData()
        );
    };
    
    layout.shapes = app.filters.shapes;

    Plotly.react(
        'plot',
        traces,
        layout
    ).then(() => {
    showGuideHover(traces);
});;
}

function makeHoverText(data) {

    return data.map(d => `
<b>${d["School Name"]}</b><br>
District: ${d["District Name"]}<br>
Reading Proficiency: ${d.Per_Proficient}%<br>
Predicted Proficiency: ${d.predicted_prof}%<br>
Difference from prediction: ${d.residual}<br>
School Type: ${d.charter_group}
`);

}

const RESIDUAL_GROUPS = [

    {
        name: "Top 10%",
        color: colors.blue
    },

    {
        name: "Top 11-20%",
        color: colors.green
    },

    {
        name: "Middle 60%",
        color: colors.gold
    },

    {
        name: "Bottom 11-20%",
        color: colors.orange
    },

    {
        name: "Bottom 10%",
        color: colors.coral
    }

];

function addBackgroundTrace(traces, data) {

    if (data.length === 0)
        return;

    addTrace(
        traces,
        data,
        {
            color: colors.grey,
            opacity: 0.50,
            size: 8,
            name: "Other districts",
        }
    );
}

function addHighlightedTraces(traces, data) {

    for (const group of RESIDUAL_GROUPS) {

        const schools =
            data.filter(
                d => d.resid_group === group.name
            );

        if (schools.length === 0)
            continue;

        addTrace(
            traces,
            schools,
            {
                color: group.color,
                opacity: 0.80,
                size: 8,
                name: group.name,
            }
        );
    }
}

function addTrace(
    traces,
    data,
    options
) {

    traces.push({

        type: "scatter",
        mode: "markers",

        x: data.map(d => d.Per_FRPL_imp),
        y: data.map(d => d.Per_Proficient),

        customdata: data.map(d => d.school_ID),

        text: makeHoverText(data),

        hovertemplate: "%{text}<extra></extra>",

        marker: {

            color: options.color,

            opacity: options.opacity,

            size: options.size

        },

        name: options.name

    });

}

function linearRegression(data) {

    const n = data.length;

    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumXX = 0;

    for (const d of data) {

        const x = d.Per_FRPL_imp;
        const y = d.Per_Proficient;

        sumX += x;
        sumY += y;
        sumXY += x * y;
        sumXX += x * x;
    }

    const slope =
        (n * sumXY - sumX * sumY) /
        (n * sumXX - sumX * sumX);

    const intercept =
        (sumY - slope * sumX) / n;

    return {
        slope,
        intercept
    };
}

function addRegressionTrace(
    traces,
    data
) {

    const regression =
        linearRegression(data);

    const x = [0, 100];

    const y =
        x.map(v =>
            regression.slope * v +
            regression.intercept
        );

    traces.push({

        type: "scatter",
        mode: "lines",

        x,
        y,

        line: {
            color: colors.blue,
            width: 3
        },

        hoverinfo: "skip",
        showlegend: false

    });

}

function showGuideHover(traces) {
    const schoolIds = app.guide.currentHoverSchools;

    if (!schoolIds || schoolIds.length === 0) {
        Plotly.Fx.unhover('plot');
        return;
    }

    // for (let curveNumber = 0; curveNumber < traces.length; curveNumber++) {
    //     const trace = traces[curveNumber];

    //     if (!trace.customdata) {
    //         continue;
    //     }

    //     const pointIndex = trace.customdata.findIndex(
    //         id => String(id) === String(schoolId)
    //     );

    //     if (pointIndex !== -1) {

    //         console.log(
    //             "Found school:",
    //             schoolId,
    //             "trace:",
    //             curveNumber,
    //             "point:",
    //             pointIndex,
    //             "trace school ID:",
    //             trace.customdata[pointIndex],
    //             "x:", trace.x[pointIndex],
    //             "y:", trace.y[pointIndex]
    //         );

    //         Plotly.Fx.hover('plot', [{
    //             curveNumber: curveNumber,
    //             pointNumber: pointIndex
    //         }]);

    //         return;
    //     }
    // }

    const hoverPoints = [];

    for (const schoolId of schoolIds) {
        for (let curveNumber = 0; curveNumber < traces.length; curveNumber++) {
            const trace = traces[curveNumber];

            if (!trace.customdata) {
                continue;
            }

            const pointIndex = trace.customdata.findIndex(
                id => String(id) === String(schoolId)
            );

            if (pointIndex !== -1) {
                hoverPoints.push({
                    curveNumber: curveNumber,
                    pointNumber: pointIndex
                });

                break;
            }
        }
    }

    if (hoverPoints.length > 0) {
        Plotly.Fx.hover('plot', hoverPoints);
    }
}

function getCategoryData() {

    const category = app.filters.category;

    switch(category) {

        case 'Districts with 1-3 elementary schools':
            return app.data.filter(d =>
                d.n_elem_schools_in_district >= 1 &&
                d.n_elem_schools_in_district <= 3
            );

        case 'Districts with 4 or more elementary schools':
            return app.data.filter(d =>
                d.n_elem_schools_in_district >= 4
            );

        case 'Top 10% only':
            return app.data.filter(d =>
                d.resid_group === 'Top 10%'
            );

        case 'Highlight MESPA award schools':
            return app.data.filter(d =>
                d.mespa_award_flag === 1
            );

        default:
            return app.data;
    }
}

function syncControls() {

    categorySelect.value = app.filters.category;

    updateDistrictDropdown();

    districtSelect.value = app.filters.district;

    showOnlyCheckbox.checked =
        app.filters.showOnlyDistrict;
}

function updateDistrictDropdown() {
    
    const categoryData = getCategoryData();

    const districts = [
        ...new Set(
            categoryData.map(d => d["District Name"])
        )
    ].sort();
    
    district.innerHTML = "<option>--</option>";

    for (const district of districts) {

        const option =
            document.createElement('option');

        option.value = district;
        option.textContent = district;

        districtSelect.appendChild(option);
    }
}

function getFilteredData() {

    const district =
        districtSelect.value;

    return app.data.filter(row => {

        if (district === 'All')
            return true;

        return (
            row["District Name"]
            === district
        );
    });
}

function getPlotTitle() {

    const district = districtSelect.value;
    const category = categorySelect.value;

    if (
        district !== 'All districts' &&
        district !== '--'
    ) {
        return district;
    }

    switch(categorySelect.value) {

        case 'All districts':
            return 'All Districts';

        case 'Districts with 1-3 elementary schools':
            return 'Districts with 1-3 Elementary Schools';

        case 'Districts with 4 or more elementary schools':
            return 'Districts with 4+ Elementary Schools';

        case 'Top 10% only':
            return 'Top 10% Performing Schools';

        case 'Highlight MESPA award schools':
            return 'MESPA Award Schools';

        default:
            return categorySelect.value;
    }

}

modeButtons.forEach(button => {

    button.addEventListener(
        "change",
        () => {

            app.mode = button.value;

            updateMode();

        }
    );

});

categorySelect.addEventListener(
    "change",
    () => {

        app.filters.category =
            categorySelect.value;
        updateDistrictDropdown();
        updatePlot();

    }
);

districtSelect.addEventListener(
    'change',
    () => {
        app.filters.district =
            districtSelect.value;
            updatePlot()
    }
);

showOnlyCheckbox.addEventListener(
    'change',
    () => {
        app.filters.showOnlyDistrict =
            showOnlyCheckbox.checked;
            updatePlot()
    }
);

clearButton.addEventListener(
    'click',
    () => {

        districtSelect.value =
            '--';

        showOnlyCheckbox.checked =
            false;

        updatePlot();
    }
);

nextButton.addEventListener("click", () => {

    if (app.guide.currentStep < guide.length - 1) {

        showGuideStep(
            app.guide.currentStep + 1
        );

    }

});

previousButton.addEventListener("click", () => {

    if (app.guide.currentStep > 0) {

        showGuideStep(
            app.guide.currentStep - 1
        );

    }

});

loadData();

