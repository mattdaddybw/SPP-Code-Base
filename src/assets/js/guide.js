const guide = [

{
    id: "observation-1a",

    title: "Observation 1",

    text: `
        <p>
            This graph plots 902 elementary schools in Minnesota.
        </p>
        <p>
            Each school’s <strong>3rd-5th grade reading proficiency</strong> is plotted against its <strong>percentage of students qualifying for Free or Reduced Priced Lunch (FRPL)</strong>.
        <p>
            FRPL is a way to measure poverty.
        </p>
    `,

    filters: {
        category: "All districts",
        district: "--"
    }

},

{
    id: "observation-1b",

    title: "Observation 1",

    text: `
        <p>
             Overall, the scatterplot shows what is well understood in education – <strong>proficiency declines as poverty increases</strong>.
        </p>
    `,

    filters: {
        category: "All districts",
        district: "--",
        regression: true
    }

},

{
    id: "observation-1c",

    title: "Observation 1",

    text: `
        <p>
              The state does not report FRPL percentages above 90%. All schools with 90% or more stack up at the 90th percentile.
        </p>
    `,

    filters: {
        category: "All districts",
        district: "--",
        showOnlyDistrict: false,
        shapes: [{
            type: 'rect',
            x0: 85,
            y0: 3,
            x1: 95,
            y1: 97,
            line: {
                color: 'rgb(55, 128, 191)',
                width: 3
            }
        }]
    }

},

{
    id: "observation-2a",

    title: "Observation 2",

    text: `
        <p>
            The legend shows that schools are represented by color. Color is determined by <strong>reading performance</strong>.
        </p>
        <p>
            Each school’s reading performance is predicted using a <a href="/model-explorer">statistical model</a> that incorporates a number of important variables. These include:
        </p>
        <ul>
            <li>% FRPL students</li>
            <li>% English Language Learners</li>
            <li>% student qualifying for special education services</li>
            <li>District size</li>
        </ul>
    `,

    filters: {
        category: "All districts",
        district: "--",
    }
},

{
    id: "observation-2b",

    title: "Observation 2",

    text: `
        <p>
            The variables in the model combine statistically to predict performance.
        </p>
        <p>
            For example, Groveland Park Elementary in Saint Paul Public Schools is predicted to have a 52.2% proficiency rate based on these variables. However, their actual proficiency rate is 60.2%. Based on this difference, Groveland’s performance is ranked by color (green).
        </p>
    `,

    filters: {
        category: "All districts",
        district: "Saint Paul Public Schools",
        highlight: "district"
    },

    hoverSchools: ["062501476"]
},

{
    id: "observation-2c",

    title: "Observation 2",

    text: `
        <p>
            Schools in the top 10% have reading proficiency rates about 11 percentage points or more above what the model predicts.
        </p>
        <p>
            Conversely, schools in the bottom 10% have reading scores about 11 percentage points or more below what the model predicts.
        </p>
    `,

    filters: {
        category: "All districts",
        district: "Saint Paul Public Schools",
        highlight: "district"
    },

    hoverSchools: ["062501431", "062501493"]
},

{
    id: "observation-2d",

    title: "Observation 2",

    text: `
        <p>
            Most districts have schools across the performance range (e.g. Saint Paul Public Schools). 
        </p>
    `,

    filters: {
        category: "All districts",
        district: "Saint Paul Public Schools",
        highlight: "district"
    }
},

{
    id: "observation-3a",

    title: "Observation 3",

    text: `
        <p>
            Poverty does not explain everything. Notice Spero Academy in Brooklyn Park (SABP). Its achievement is lower than that of many schools, including many in the bottom 10%.
        </p>
        <p>
            However, SABP’s enrollment consists largely of students receiving special education services. The model takes this important enrollment factor into account when determining performance.
        </p>
    `,

    filters: {
        category: "All districts",
        district: "--"
    },

    hoverSchools: ["411307020"]
},

{
    id: "observation-3b",

    title: "Observation 3",

    text: `
        <p>
            Thus, the model shows SABP outperforming other schools whose actual achievement rates are higher. You can learn more about a school’s enrollment by using the state’s online Report Card system.
        </p>
    `,

    filters: {
        category: "All districts",
        district: "--"
    },

    hoverSchools: ["411307020", "072101651"]
},

{
    id: "observation-4a",

    title: "Observation 4",

    text: `
        <p>
            The legend shows that schools are also represented by shape. Shape indicates district size.
        </p>
        <p>
            In this model, large districts have 4 or more elementary schools. There are 45 districts with 4 or more elementary schools.
        </p>
        <p>
            Of the 902 plotted elementary schools, 422 elementary schools are in large districts.
        </p>
    `,

    filters: {
        category: "All districts",
        district: "Spero Academy",
        highlight: "district"
    }
},

{
    id: "observation-5a",

    title: "Observation 5",

    text: `
        <p>
            Small districts have three or fewer elementary schools. There are 408 small districts composed of 480 elementary schools.
        </p>
        <p>
            Eighteen districts have three schools, thirty-seven have two schools, and the remaining 425 are the only elementary schools in their districts.
        </p>
        <p>
            About 47% of elementary schools in Minnesota are their district’s only elementary school.
        </p>
    `,

    filters: {
        category: "All districts",
        district: "Spero Academy",
        highlight: "district"
    }
},

{
    id: "observation-6a",

    title: "Observation 6",

    text: `
        <p>
            Top performing schools are not evenly distributed across large and small districts. Fifty-eight schools in small districts, or 12%, are in the top 10%.
        </p>
        <p>
            In contrast, only 7.8% of schools in larger districts are in the top 10%. This means large districts have fewer top-performing schools than would be expected if performance were evenly distributed.
        </p>
        <p>
            Small districts are somewhat more likely to produce schools that substantially outperform expectations.
        </p>
    `,

    filters: {
        category: "All districts",
        district: "Spero Academy",
        highlight: "district"
    }
},

{
    id: "observation-7a",

    title: "Observation 7",

    text: `
        <p>
            District size interacts with poverty to produce different performance outcomes. As poverty increases, schools in small districts tend to perform better. This is evident at the higher end of poverty.
        </p>
        <p>
            There are 11 schools in the top 10% serving 80%+ FRPL enrollments. 10 of them are in small districts. There are 23 schools in the top 20% serving 80%+ FRPL enrollments, 18 of which are in small districts. 
        </p>
        <p>
            This concentration is not random. It reflects a consistent pattern in how small districts respond to higher levels of poverty.
        </p>
    `,

    filters: {
        category: "All districts",
        district: "Spero Academy",
        highlight: "district"
    }
},

{
    id: "observation-8a",

    title: "Observation 8",

    text: `
        <p>
            At the high end of wealth, large districts tend to outperform small districts.
        </p>
        <p>
            Larger districts often have more resources and may benefit more directly from increases in community wealth through referenda, parent organizations, and private contributions. Wealthier districts also tend to serve families with higher levels of formal education, more stable economic conditions, and greater access to early learning opportunities.
        </p>
        <p>
            Yet large systems do not respond as effectively to increased poverty as schools in small districts. Understanding that constraint is central to improving outcomes at scale.
        </p>
    `,

    filters: {
        category: "All districts",
        district: "Spero Academy",
        highlight: "district"
    }
},

{
    id: "observation-9a",

    title: "Observation 9",

    text: `
        <p>
            Districts do not reliably produce excellence. If excellence were a function of the district office, school improvement would be a matter of replicating the model of districts whose schools consistently outperform others in the state. 
        </p>
        <p>
            But those districts don’t exist. Twenty large districts have at least one school in the top 10%. Most do not.
        </p>
        <p>
            Anoka-Hennepin has four elementary schools in the top 10%, the highest number of any district.
        </p>
    `,

    filters: {
        category: "All districts",
        district: "Spero Academy",
        highlight: "district"
    }
},

{
    id: "observation-9b",

    title: "Observation 9",

    text: `
        <p>
            Excellent performance under challenging conditions is more strongly associated with small districts, which most often have only one elementary school. Therefore, we should consider that excellence is a function of what happens at the school level, not the district level.
        </p>
        <p>
            This has important implications for education reform.
        </p>
    `,

    filters: {
        category: "All districts",
        district: "Spero Academy",
        highlight: "district"
    }
},

{
    id: "observation-10a",

    title: "Observation 10",

    text: `
        <p>
            Public school adjacent institutions are disconnected from academic performance. One ready example is the Minnesota Elementary School Principals’ Association (MESPA).
        </p>
        <p>
            MESPA awards principals annually for exceptional leadership. The scatterplot shows schools with award winning administrators and demonstrates that institutional recognition is not tightly connected to strong reading outcomes.
        </p>
    `,

    filters: {
        category: "All districts",
        district: "Spero Academy",
        highlight: "district"
    }
},
{
    id: "observation-10b",

    title: "Observation 10",

    text: `
        <p>
            MESPA’s policy priorities focus largely on the conditions under which principals work, including funding, local control, and mandates. There is no evidence that MESPA’s priorities are associated with stronger academic outcomes.
        </p>
        <p>
            That raises a larger question: to what extent are Minnesota’s educational institutions explicitly organized around improving academic achievement?
        </p>
    `,

    filters: {
        category: "All districts",
        district: "Spero Academy",
        highlight: "district"
    }
},



];