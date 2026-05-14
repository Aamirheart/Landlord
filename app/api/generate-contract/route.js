import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      landlordName,
      tenantName,
      propertyAddress,
      city,
      state,
      propertyType,
      monthlyRent,
      securityDeposit,
      startDate,
      duration,
      noticePeriod,
      rentDueDate,
      tone,
      selectedClauses,
      situation,
      customInstructions,
    } = body;

    if (!selectedClauses || selectedClauses.length === 0) {
      return Response.json({ error: "Please select at least one clause." }, { status: 400 });
    }

    const clauseLabels = {
      pet: "Pet Permission",
      subletting: "Subletting",
      lateRent: "Late Rent Payment",
      securityDeposit: "Security Deposit",
      maintenance: "Repairs and Maintenance",
      guest: "Guest Stay",
      earlyTermination: "Early Termination",
      propertyDamage: "Property Damage",
      noise: "Noise and Nuisance",
      lockIn: "Lock-in Period",
      rentEscalation: "Rent Escalation",
      utilities: "Utility Bills",
      policeVerification: "Police Verification",
      custom: "Custom Clause",
    };

    const selectedClauseNames = selectedClauses
      .map((c) => clauseLabels[c] || c)
      .join("\n- ");

    const prompt = `You are an expert lease drafting assistant for small landlords in India and emerging markets.

Your job is to draft a complete multi-section rental agreement based on the landlord's inputs.

This is not legal advice. You are only providing general drafting assistance.

The user is a small landlord. They may not understand complex legal language. Write in clear legal-style English that is practical, copy-paste ready, and easy to understand.

Use India-relevant rental agreement language.

Landlord details:
Landlord name: ${landlordName || "[Landlord Name]"}
Tenant name: ${tenantName || "[Tenant Name]"}
Property address: ${propertyAddress || "[Property Address]"}
City: ${city || "[City]"}
State: ${state || "[State]"}
Property type: ${propertyType || "[Property Type]"}

Agreement details:
Monthly rent: ₹${monthlyRent || "[Amount]"}
Security deposit: ₹${securityDeposit || "[Amount]"}
Agreement start date: ${startDate || "[Start Date]"}
Agreement duration: ${duration || "[Duration]"}
Notice period: ${noticePeriod || "30 days"}
Rent due date: ${rentDueDate || "5th of each month"}
Tone: ${tone || "balanced"}

Selected clause categories:
- ${selectedClauseNames}

Situation described by landlord:
${situation || "Not provided"}

Custom clause instructions:
${customInstructions || "Not applicable"}

Draft a complete multi-section rental agreement output with the following structure:

1. AGREEMENT TITLE (bold header)
2. PARTIES SECTION (landlord and tenant details)
3. PROPERTY DETAILS SECTION
4. BASIC COMMERCIAL TERMS (rent, deposit, duration, notice period)
5. INDIVIDUAL CLAUSES — Generate ONE FULL SEPARATE CLAUSE for EVERY selected clause category listed above. Do NOT skip any selected clause. Number them clearly (e.g., CLAUSE 1: PET PERMISSION, CLAUSE 2: SUBLETTING, etc.)
6. PLAIN-ENGLISH SUMMARY (brief, bullet points, what each clause means for the landlord)
7. LANDLORD CHECKLIST (actionable items before and after signing)
8. RISK NOTES (key risks the landlord should know)
9. STATE-SPECIFIC CAUTION (for ${state || "the relevant state"} — mention stamp duty, registration, rent control act, tenancy rules)
10. SIGNATURE BLOCK (landlord, tenant, witness, date)
11. LEGAL DISCLAIMER

Rules:
1. Generate one COMPLETE separate clause for every selected clause category — do NOT merge or skip any.
2. Write in proper rental agreement language.
3. Keep clauses landlord-protective but fair.
4. Avoid unnecessary jargon.
5. Use "Landlord" and "Tenant" consistently.
6. Mention written consent wherever relevant.
7. Include consequences for breach where appropriate.
8. Include a state-specific caution because rent control, stamp duty, registration, and tenancy rules vary by Indian state.
9. Do not claim this is legal advice.
10. Do not claim the contract is legally guaranteed.
11. Make the output copy-paste ready.
12. Use UPPERCASE for clause headings so they stand out clearly.
13. Use the tone: ${tone || "balanced"} — ${
      tone === "strict"
        ? "maximum protection for the landlord, firm language"
        : tone === "friendly"
        ? "warm but clear language, firm on key protections"
        : "fair to both parties, clear and practical"
    }

For specific clause types:
- Pet permission: cover consent, damage, cleaning, nuisance, complaints, safety, and revocation.
- Subletting: cover no subletting without consent, tenant remains responsible, subtenant details, damage, rent, and breach.
- Late rent: cover due date, grace period, late fee wording, notice, repeated delay, and breach.
- Security deposit: cover deductions, unpaid rent, damage, cleaning, refund timeline, and inspection.
- Repairs: separate landlord responsibility and tenant responsibility.
- Guest stay: cover guest duration, notice, no permanent occupation, and tenant responsibility.
- Early termination: cover notice period, dues, possession handover, deposit adjustment, and written confirmation.
- Property damage: cover tenant liability, inspection, repair cost, and deposit deduction.
- Noise and nuisance: cover peaceful occupation, neighbours, society rules, complaints, and breach.
- Lock-in period: cover minimum stay, early exit consequences, and exceptions.
- Rent escalation: cover percentage or periodic increase, written notice, and effective date.
- Utility bills: cover electricity, water, internet, gas, maintenance charges, and unpaid dues.
- Police verification: cover tenant cooperation and document submission.
- Custom clause: infer the best clause from the landlord's situation and custom instructions.`;

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-2.0-flash",
      contents: prompt,
    });

    const text = response.text;

    return Response.json({ contract: text });
  } catch (error) {
    console.error("Gemini API error:", error);
    return Response.json(
      { error: "Failed to generate contract. Please check your API key and try again." },
      { status: 500 }
    );
  }
}