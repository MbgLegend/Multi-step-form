// Imports
import { useState } from 'react'

import './App.css'

const plans = [
    {
        image: "assets/images/icon-arcade.svg",
        name: "Arcade",
        prices: {
            monthly: 9,
            yearly: 90
        }
    },
    {
        image: "assets/images/icon-advanced.svg",
        name: "Advanced",
        prices: {
            monthly: 12,
            yearly: 120
        }
    },
    {
        image: "assets/images/icon-pro.svg",
        name: "Pro",
        prices: {
            monthly: 15,
            yearly: 150
        }
    }
]

const perks = [
    {
        name: "Online service",
        description: "Access to multiplayer games",
        prices: {
            monthly: 1,
            yearly: 10
        }
    },
    {
        name: "Larger storage",
        description: "Extra 1TB of cloud save",
        prices: {
            monthly: 2,
            yearly: 20
        }
    },
    {
        name: "Customizable Profile",
        description: "Custom theme on your profile",
        prices: {
            monthly: 2,
            yearly: 20
        }
    }
]

function App() {
    const [sectionIndex, setSectionIndex] = useState(0)
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        selected_plan: "Arcade",
        added_perks: []
    })
    const [monthlyPayment, setMonthlyPayment] = useState(true)
    let total = 0

    function getPriceByName(type, name, isMonthly) {
        const found = type.find(type => type.name === name)

        if (found) {
            return isMonthly ? found.prices.monthly : found.prices.yearly
        }

        return null
    }

    const togglePerk = (perkName) => {
        const index = form.added_perks.indexOf(perkName)
        if (index === -1) {
            setForm(prevForm => ({
                ...prevForm,
                added_perks: [...prevForm.added_perks, perkName]
            }))
        } else {
            setForm(prevForm => ({
                ...prevForm,
                added_perks: prevForm.added_perks.filter(perk => perk !== perkName)
            }))
        }
    }

    const renderSections = () => {
        switch (sectionIndex) {
          case 0:
            return (
                <div className="content">
                    <div className="title">
                        <h1>Personal info</h1>
                        <p>Please provide your name, email address, and phone number.</p>
                    </div>
                    <form>
                        <div className='field'>
                            <label htmlFor="Name">Name</label>
                            <input 
                                type="text" 
                                placeholder='e.g. Stephen King'
                                id='Name'
                                name='Name'
                                value={form.name}
                                onChange={(e) => {
                                    setForm({
                                        ...form,
                                        name: e.target.value
                                    })
                                }}
                            />
                        </div>
                        <div className='field'>
                            <label htmlFor="Email-Address">Email Address</label>
                            <input 
                                type="text" 
                                placeholder='e.g. stephenking@lorem.com'
                                id='Email-Address'
                                name='Email-Address'
                                value={form.email}
                                onChange={(e) => {
                                    setForm({
                                        ...form,
                                        email: e.target.value
                                    })
                                }}
                            />
                        </div>
                        <div className='field'>
                            <label htmlFor="Phone-Number">Phone Number</label>
                            <input 
                                type="tel" 
                                placeholder='e.g. +1 234 567 890'
                                id='Phone-Number'
                                name='Phone-Number'
                                value={form.phone}
                                onChange={(e) => {
                                    setForm({
                                        ...form,
                                        phone: e.target.value
                                    })
                                }}
                            />
                        </div>
                    </form>
                </div>
            )

          case 1:
            return (
                <div className="content">
                    <div className="title">
                        <h1>Select your plan</h1>
                        <p>You have the option of monthly or yearly billing.</p>
                    </div>
                    <div className="boxes">
                        {plans.map((plan) => (
                            <div 
                                className={`box ${form.selected_plan === plan.name ? 'active' : ''}`}
                                key={plan.name}
                                onClick={() => {
                                    setForm({
                                        ...form,
                                        selected_plan: plan.name
                                    })
                                }}
                            >
                                <img src={plan.image} alt={plan.name} />
                                <div>
                                    <h2>{plan.name}</h2>
                                    <p>
                                        {monthlyPayment ? (
                                            `$${plan.prices.monthly}/mo`
                                        ) : (
                                            `$${plan.prices.yearly}/yr`
                                        )}
                                    </p>
                                    {!monthlyPayment && (
                                        <span>2 Months free</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="swticher">
                        <button 
                            className={`${monthlyPayment ? 'active' : ''}`}
                        >Monthly</button>
                        <div 
                            className={`toggle ${monthlyPayment ? '' : 'active'}`}
                            onClick={() => {
                                setMonthlyPayment(prev => !prev)
                            }}>
                            <div className="toggle-cirlce"></div>
                        </div>
                        <button 
                            className={`${monthlyPayment ? '' : 'active'}`}
                        >Yearly</button>
                    </div>
                </div>
            )
          
            case 2:
                return (
                    <div className="content">
                        <div className="title">
                            <h1>Pick add-ons</h1>
                            <p>Add-ons help enhance your gaming experience.</p>
                        </div>
                        <div className="add-ons">
                            {perks.map((perk) => (
                                <div 
                                    className={`add-on-box ${form.added_perks.includes(perk.name) ? 'active' : ''}`}
                                    key={perk.name}
                                    onClick={() => {
                                        togglePerk(perk.name)
                                    }}
                                >
                                    <div>
                                        <input 
                                            type="checkbox" 
                                            onChange={() => {
                                                togglePerk(perk.name)
                                            }}
                                            checked={form.added_perks.includes(perk.name)}
                                        />
                                        <div>
                                            <h2>{perk.name}</h2>
                                            <p>{perk.description}</p>
                                        </div>
                                    </div>
                                    <span>
                                        {monthlyPayment ? (
                                            `+$${perk.prices.monthly}/mo`
                                        ) : (
                                            `+$${perk.prices.yearly}/yr`
                                        )}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )

            case 3:
                return (
                    <div className="content">
                        <div className="title">
                            <h1>Finishing up</h1>
                            <p>Double-check everything looks OK before confirming.</p>
                        </div>
                        <div className="reciept">
                            <div className='recipt-title'>
                                <div>
                                    <h2>{form.selected_plan} ({monthlyPayment ? 'Monthly' : 'Yearly'})</h2>
                                    <span onClick={() => {
                                        setSectionIndex(1)
                                    }}>Change</span>
                                </div>
                                <h3>${getPriceByName(plans, form.selected_plan, monthlyPayment)}/{monthlyPayment ? 'mo' : 'yr'}</h3>
                            </div>
                            {form.added_perks.length !== 0 && (
                                <>
                                    <hr />
                                    <div className="selected-perks">
                                        {form.added_perks.map((perk) => {
                                            total += getPriceByName(perks, perk, monthlyPayment)
        
                                            return (
                                                <div 
                                                    className='recipt-feature'
                                                >
                                                    <p>{perk}</p>
                                                    <span>
                                                        ${getPriceByName(perks, perk, monthlyPayment)}/{monthlyPayment ? 'mo' : 'yr'}
                                                    </span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="price">
                            <p>Total (per {monthlyPayment ? 'month' : 'year'})</p>
                            <span>+${total + getPriceByName(plans, form.selected_plan, monthlyPayment)}/{monthlyPayment ? 'Monthly' : 'Yearly'}</span>
                        </div>
                    </div>
                )
            
            case 4:
                return (
                    <div className="content">
                        <div className="center-content">
                            <img src="assets/images/icon-thank-you.svg" alt="Thank you" />
                            <h2>Thank you!</h2>
                            <p>Thanks for confirming your subscription! We hope you have fun 
                            using our platform. If you ever need support, please feel free 
                            to email us at support@loremgaming.com.</p>
                        </div>
                    </div>
                )
        
          default:
            break
        }
    }

    return (
      <>
        <main className="container">
            <div className="grid">
                <aside>
                    <ul>
                        <li className={sectionIndex === 0 ? 'active' : ''}>
                            <button onClick={() => {
                                setSectionIndex(0)
                            }}>1</button>
                            <div className="text">
                                <h2>STEP 1</h2>
                                <p>Your Info</p>
                            </div>
                        </li>
                        <li className={sectionIndex === 1 ? 'active' : ''}> 
                            <button onClick={() => {
                                if (form.name === "" || form.email === "" || form.phone === "") {
                                    alert("❌ Fill in all fields")
                                } else {
                                    setSectionIndex(1)
                                }
                            }}>2</button>
                            <div className="text">
                                <h2>STEP 2</h2>
                                <p>Select Plan</p>
                            </div>
                        </li>
                        <li className={sectionIndex === 2 ? 'active' : ''}>
                            <button onClick={() => {
                                if (form.name === "" || form.email === "" || form.phone === "") {
                                    alert("❌ Fill in all fields")
                                } else {
                                    setSectionIndex(2)
                                }
                            }}>3</button>
                            <div className="text">
                                <h2>STEP 3</h2>
                                <p>Add-Ons</p>
                            </div>
                        </li>
                        <li className={sectionIndex === 3 ? 'active' : ''}>
                            <button onClick={() => {
                                if (form.name === "" || form.email === "" || form.phone === "") {
                                    alert("❌ Fill in all fields")
                                } else {
                                    setSectionIndex(3)
                                }
                            }}>4</button>
                            <div className="text">
                                <h2>STEP 4</h2>
                                <p>Summary</p>
                            </div>
                        </li>
                    </ul>
                </aside>
                <article>
                    {renderSections()}
                    <footer>
                        {sectionIndex !== 4 && (
                            sectionIndex > 0 ? (
                                <>
                                    <button className='back' onClick={() => {
                                        setSectionIndex(prev => prev - 1)
                                    }}>Go Back</button>
    
                                    {sectionIndex >= 3 ? (
                                        <button className='forward' onClick={() => {
                                            setSectionIndex(4)
                                        }}>Confirm</button>
                                    ) : (
                                        <button className='forward' onClick={() => {
                                            setSectionIndex(prev => prev+1)
                                        }}>Next Step</button>
                                    )}    
                                </>
                            ) : (
                                <button className='forward' onClick={() => {
                                    if (form.name === "" || form.email === "" || form.phone === "") {
                                        alert("❌ Fill in all fields")
                                    } else {
                                        setSectionIndex(prev => prev+1)
                                    }
                                }}>Next Step</button>
                            )
                        )}
                    </footer>
                </article>
            </div>
        </main>
      </>
    )
}

export default App