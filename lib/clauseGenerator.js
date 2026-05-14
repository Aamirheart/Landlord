/**
 * clauseGenerator.js
 * 
 * Core clause generation logic.
 * Currently uses rule-based templates for instant offline use.
 * 
 * TO CONNECT WITH AI API (future):
 * Replace the switch/case logic in generateClause() with an API call to
 * your preferred LLM (OpenAI, Anthropic, Gemini, etc.) using formData as input.
 * The prompt should ask the model to generate a lease clause in the format
 * returned by this function: { title, clause, explanation, checklist, riskNote }
 */

const toneModifiers = {
  balanced: {
    label: 'balanced',
    prefix: 'Both parties agree that',
    permissionPhrase: 'with prior written consent from the Landlord',
    violationConsequence: 'may be treated as a material breach of this rental agreement',
  },
  strict: {
    label: 'strictly landlord-protective',
    prefix: 'The Tenant acknowledges and agrees that',
    permissionPhrase: 'only with explicit prior written consent from the Landlord, which may be withheld at the Landlord\'s sole discretion',
    violationConsequence: 'shall constitute a material breach and may result in immediate termination of this rental agreement',
  },
  friendly: {
    label: 'friendly but clear',
    prefix: 'To keep things clear and fair,',
    permissionPhrase: 'after getting written approval from the Landlord',
    violationConsequence: 'will be considered a violation of the rental terms and the Landlord may take appropriate action',
  },
}

function getParties(formData) {
  const landlord = formData.landlordName || 'the Landlord'
  const tenant = formData.tenantName || 'the Tenant'
  const city = formData.city || '[City]'
  const state = formData.state || '[State]'
  const property = formData.propertyType || 'the rental property'
  return { landlord, tenant, city, state, property }
}

function generatePetClause(formData, tone, parties) {
  const { landlord, tenant } = parties
  const t = toneModifiers[tone]

  const clause = tone === 'strict'
    ? `PET PERMISSION CLAUSE

${t.prefix} no pet, animal, or live creature of any kind shall be kept, harboured, or allowed to reside at the rental premises ${t.permissionPhrase}.

1. WRITTEN CONSENT REQUIRED: ${tenant} must submit a written pet request to ${landlord} specifying the animal type, breed, age, and vaccination records. Permission, if granted, shall be valid for one specific animal only and shall not extend to any other animal.

2. DAMAGE LIABILITY: ${tenant} shall be solely and fully responsible for any and all damage caused by the permitted pet to the premises, fixtures, walls, flooring, furnishings, or any part of the property. The cost of repair or replacement shall be deducted from the security deposit or billed separately.

3. NUISANCE AND COMPLAINTS: ${tenant} is responsible for ensuring the pet does not cause noise disturbances, hygiene issues, or complaints from other residents or neighbours. Repeated complaints shall be grounds for immediate revocation of pet permission.

4. REVOCATION: ${landlord} reserves the right to revoke pet permission with 7 days' written notice if ${tenant} fails to comply with any pet-related condition. ${tenant} shall remove the pet within the notice period.

5. NO DANGEROUS ANIMALS: Pets classified as dangerous, exotic, or venomous under any applicable law are strictly prohibited regardless of any prior permission granted.

6. CLEANING: Upon vacating the premises, ${tenant} shall professionally clean and deodorise all areas accessible to the pet at ${tenant}'s expense.

Any violation of this clause ${t.violationConsequence}.`
    : tone === 'friendly'
    ? `PET PERMISSION CLAUSE

${t.prefix} here is how having a pet at the rental property will work:

1. GETTING PERMISSION: ${tenant} can keep a pet at the property ${t.permissionPhrase}. The request should mention the type of animal, breed, and age.

2. PET RESPONSIBILITY: ${tenant} takes full responsibility for the pet — including any damage to the property, noise issues, or complaints from neighbours. Repair costs for pet-related damage will come from the security deposit or be billed directly.

3. Cleanliness: The property should be kept clean and odour-free. When ${tenant} moves out, a professional cleaning of pet-accessible areas will be required.

4. If issues come up: If the pet causes repeated disturbances, ${landlord} may ask ${tenant} to remove the animal with reasonable notice.

5. Exceptions: Dangerous or exotic animals are not allowed under any circumstances.

Any violation of these terms ${t.violationConsequence}.`
    : `PET PERMISSION CLAUSE

${t.prefix} the following terms apply to the keeping of pets at the rental property:

1. PRIOR CONSENT: ${tenant} shall not keep any pet or animal at the premises without prior written consent from ${landlord}. Consent may be sought by submitting a written request with details of the animal.

2. LIABILITY FOR DAMAGE: ${tenant} shall be responsible for any damage to the property caused by the pet, including flooring, walls, fixtures, and garden areas. Repair or replacement costs may be deducted from the security deposit.

3. NUISANCE: ${tenant} shall ensure the pet does not cause noise disturbances or complaints from neighbours. In case of repeated issues, ${landlord} may withdraw the permission to keep the pet.

4. CLEANING OBLIGATION: ${tenant} shall restore the property to a clean and odour-free condition upon vacating, at ${tenant}'s expense.

5. PROHIBITED ANIMALS: Dangerous, exotic, or venomous animals are not permitted under any circumstances.

Any violation of this clause ${t.violationConsequence}.`

  return {
    title: 'Pet Permission Clause',
    clause,
    explanation: `This clause covers the rules around your tenant keeping a pet. The tenant needs your written permission first, is responsible for all damage and complaints caused by the pet, and must professionally clean the property when they leave. You keep the right to revoke permission if problems come up.`,
    checklist: [
      'Get the pet request in writing before giving consent',
      'Specify the exact animal (breed, type) in the written permission',
      'Consider taking an additional pet deposit (separate from security deposit)',
      'Do a property inspection after the tenant moves out',
      'Keep records of any complaints or incidents related to the pet',
    ],
    riskNote: `If your rental agreement is registered, any pet permission given verbally is hard to enforce. Always issue written permission — even a simple WhatsApp message confirming it can help. Note that in some states, you may not be able to evict solely on grounds of pet noise; check your state's Rent Control provisions.`,
  }
}

function generateSublettingClause(formData, tone, parties) {
  const { landlord, tenant } = parties
  const t = toneModifiers[tone]

  const clause = `SUBLETTING AND ASSIGNMENT CLAUSE

${t.prefix} subletting of the rented premises, or any portion thereof, is governed as follows:

1. NO SUBLETTING WITHOUT PERMISSION: ${tenant} shall not sublet, underlet, assign, or part with possession of the rented premises or any part thereof ${t.permissionPhrase}.

2. FORMAL REQUEST: Any request to sublet must be submitted in writing, including the proposed subtenant's full name, contact details, purpose of stay, and expected duration.

3. TENANT RESPONSIBILITY CONTINUES: Even if subletting permission is granted, ${tenant} shall remain primarily responsible for payment of monthly rent, maintenance charges, and any damages caused by the subtenant to the property.

4. NO FURTHER SUBLETTING: A subtenant permitted under this clause shall not further sublet or assign the premises or any part of it to any third party.

5. SUBTENANT DOCUMENTATION: ${tenant} shall provide a copy of any subtenant's valid government-issued ID and, where applicable, police verification, to ${landlord} prior to the subtenant taking possession.

6. REVOCATION: ${landlord} may revoke subletting permission with 15 days' written notice if the subtenant violates any terms of the original rental agreement.

Any violation of this clause ${t.violationConsequence}.`

  return {
    title: 'Subletting and Assignment Clause',
    clause,
    explanation: `This clause stops your tenant from passing the rental property to someone else without your knowledge. Even if you do allow it, the original tenant stays responsible for rent and damage. You get to know who is living in your property at all times.`,
    checklist: [
      'Never give verbal subletting permission — always get it in writing',
      'Collect ID proof of the subtenant before they move in',
      'Consider whether your original agreement needs to be modified if subletting is ongoing',
      'Check if local Rent Control laws restrict your right to refuse subletting',
      'Ensure the subtenant does not receive a receipt in their own name — that could create a new tenancy',
    ],
    riskNote: `Subletting without permission is a common grey area in India. If your tenant sublets and you accept rent from the subtenant, you may inadvertently create a new tenancy. Keep all rent receipts in the original tenant's name only. This is particularly important in states with strong Rent Control Acts such as Maharashtra, Delhi, and Tamil Nadu.`,
  }
}

function generateLateRentClause(formData, tone, parties) {
  const { landlord, tenant } = parties
  const t = toneModifiers[tone]

  const penalty = tone === 'strict' ? '2%' : '1%'
  const gracePeriod = tone === 'friendly' ? '5' : '3'

  const clause = `LATE RENT PAYMENT CLAUSE

${t.prefix} the following terms apply to the payment of monthly rent:

1. DUE DATE: Monthly rent shall be paid by ${tenant} to ${landlord} on or before the 5th day of each calendar month for that month's occupancy.

2. GRACE PERIOD: A grace period of ${gracePeriod} calendar days is provided after the due date. Rent paid within this grace period will not attract any late payment charges.

3. LATE PAYMENT CHARGE: If rent is not received by ${landlord} within the grace period, ${tenant} shall pay a late payment charge of ${penalty} of the monthly rent amount for each calendar month (or part thereof) for which payment is delayed.

4. WRITTEN NOTICE: ${landlord} may issue a written notice to ${tenant} if rent remains unpaid beyond the grace period. ${tenant} shall remedy the default within 7 days of receiving such notice.

5. REPEATED DEFAULT: If ${tenant} defaults in payment of rent for 2 or more consecutive months, ${landlord} may initiate proceedings for eviction in accordance with applicable law.

6. ONLINE PAYMENT PREFERENCE: ${tenant} is encouraged to pay rent via bank transfer, UPI, or other traceable digital payment methods. Both parties agree to retain payment records for the duration of the tenancy.

Any violation of this clause ${t.violationConsequence}.`

  return {
    title: 'Late Rent Payment Clause',
    clause,
    explanation: `This clause sets clear expectations about when rent is due, gives the tenant a short window to pay without penalty, and spells out what happens if they regularly miss payments. It keeps both sides accountable and gives you a documented basis to act if the problem continues.`,
    checklist: [
      'Keep receipts or bank transfer records for every rent payment',
      'If using cash, issue a signed rent receipt mentioning the month and amount',
      'Send a polite written reminder (WhatsApp or email is fine) when rent is overdue',
      'Document any pattern of late payment — it supports legal action if needed',
      'Check your state\'s Rent Control Act for limits on late payment charges',
    ],
    riskNote: `Late payment charges are enforceable only if they are explicitly mentioned in the registered rental agreement. Verbal agreements on penalties are very difficult to enforce in court. Also, some state Rent Control Acts cap the amount a landlord can charge as penalty — confirm the applicable limit for your state.`,
  }
}

function generateSecurityDepositClause(formData, tone, parties) {
  const { landlord, tenant } = parties
  const t = toneModifiers[tone]

  const clause = `SECURITY DEPOSIT CLAUSE

${t.prefix} the security deposit paid by ${tenant} to ${landlord} is governed as follows:

1. DEPOSIT AMOUNT: ${tenant} has paid a refundable security deposit to ${landlord} as specified in the rental agreement, to be held for the duration of the tenancy.

2. PURPOSE: The security deposit is held as security against: (a) unpaid rent or utility charges; (b) damage to the premises beyond normal wear and tear; (c) costs incurred by ${landlord} to restore the property due to ${tenant}'s default.

3. NORMAL WEAR AND TEAR: Routine wear and tear (minor scuffs, faded paint) shall not be deducted from the deposit. ${landlord} shall not make deductions for cosmetic deterioration caused solely by age.

4. REFUND TIMELINE: The security deposit shall be refunded within 30 days of ${tenant} vacating the premises, after deduction of any legitimate dues, provided ${tenant} has: (a) surrendered possession; (b) settled all outstanding bills; (c) returned all keys.

5. DEDUCTION STATEMENT: If any amount is deducted from the deposit, ${landlord} shall provide a written itemised statement of deductions to ${tenant} within the refund period.

6. NO ADJUSTMENT AGAINST RENT: ${tenant} shall not adjust the security deposit against the last month's rent without the prior written consent of ${landlord}.

Any violation of this clause ${t.violationConsequence}.`

  return {
    title: 'Security Deposit Clause',
    clause,
    explanation: `This clause protects both sides. You can deduct genuine costs from the deposit (unpaid rent, actual damage) but not for normal wear and tear. You must return the deposit within 30 days and explain any deductions in writing. This reduces end-of-tenancy disputes significantly.`,
    checklist: [
      'Conduct a move-in inspection and document the property\'s condition with photos',
      'Give the tenant a copy of the move-in report — this is your baseline for deductions',
      'Keep the deposit in a separate account — never mix with personal funds',
      'Issue a receipt acknowledging the deposit amount received',
      'Do a joint move-out inspection with the tenant before they leave',
    ],
    riskNote: `The Model Tenancy Act (2021) caps security deposits at 2 months' rent for residential properties, but this is not yet uniformly adopted across states. Some states still allow higher deposits. Always check the applicable state law. Unjustified retention of a security deposit can result in a dispute before the Rent Authority.`,
  }
}

function generateMaintenanceClause(formData, tone, parties) {
  const { landlord, tenant } = parties
  const t = toneModifiers[tone]

  const clause = `REPAIRS AND MAINTENANCE CLAUSE

${t.prefix} responsibility for repairs and maintenance of the rental property is divided as follows:

1. LANDLORD RESPONSIBILITIES: ${landlord} shall be responsible for structural repairs, major electrical work, plumbing (excluding blockages caused by ${tenant}), roof leaks, and any damage that renders the property uninhabitable. Repairs shall be undertaken within a reasonable time after written notice from ${tenant}.

2. TENANT RESPONSIBILITIES: ${tenant} shall be responsible for: (a) day-to-day maintenance and minor repairs (e.g., fuses, tap washers, minor plumbing blockages); (b) keeping the premises clean and in good sanitary condition; (c) repairs necessitated by ${tenant}'s negligence or misuse; (d) painting or touch-up required due to ${tenant}'s actions.

3. REPORTING OBLIGATION: ${tenant} shall promptly notify ${landlord} in writing of any damage or defect requiring ${landlord}'s attention. Failure to report a known defect that worsens over time may result in ${tenant} sharing liability for the increased cost.

4. ALTERATIONS PROHIBITED: ${tenant} shall not carry out any structural alterations, additions, or renovations without prior written consent from ${landlord}. Approved alterations, unless otherwise agreed, shall become the property of ${landlord} upon vacation.

5. APPROVED CONTRACTORS: ${landlord} reserves the right to approve the contractor for major repairs. ${tenant} shall not engage contractors for major work without ${landlord}'s written approval.

Any violation of this clause ${t.violationConsequence}.`

  return {
    title: 'Repairs and Maintenance Clause',
    clause,
    explanation: `This clause clearly divides repair responsibilities. You handle the big structural issues; the tenant handles daily upkeep and any damage they cause. It also requires the tenant to tell you about problems early, which prevents small issues from becoming expensive ones.`,
    checklist: [
      'Provide the tenant with an emergency contact number for urgent repairs',
      'Keep a log of all repair requests and your responses',
      'Never ignore written repair notices — delayed response may be used against you in court',
      'Do a full property inspection once a year with the tenant\'s knowledge and consent',
      'Get all repair agreements and alterations in writing',
    ],
    riskNote: `If you fail to carry out structural repairs after written notice from the tenant, the tenant may, in some states, apply to the Rent Authority for a rent reduction or permission to carry out repairs and deduct the cost. Always respond to written repair requests promptly, even if only to acknowledge and provide a timeline.`,
  }
}

function generateGuestClause(formData, tone, parties) {
  const { landlord, tenant } = parties
  const t = toneModifiers[tone]

  const clause = `GUEST STAY CLAUSE

${t.prefix} the following terms govern the stay of guests at the rental premises:

1. SHORT-TERM GUESTS: ${tenant} may have guests stay at the premises for a period not exceeding 7 consecutive days (or 15 days in any calendar month) without prior notice to ${landlord}.

2. EXTENDED STAYS: Any guest intending to stay for more than 7 consecutive days must be reported in writing to ${landlord} within 3 days of such stay commencing. ${landlord}'s written approval is required ${t.permissionPhrase} for stays exceeding 15 consecutive days.

3. TENANT RESPONSIBILITY: ${tenant} shall be responsible for the behaviour and conduct of all guests. Any damage caused by guests shall be treated as damage caused by ${tenant} and charged accordingly.

4. SUBLETTING NOT PERMITTED: A guest's extended stay does not create any tenancy rights. ${tenant} shall not receive rent or any payment from guests. Any arrangement that involves payment from a guest ${t.violationConsequence}.

5. POLICE VERIFICATION: For guests staying more than 30 days, ${tenant} shall assist in completing any required police verification or registration under local residential tenancy registration requirements, if applicable.

Any violation of this clause ${t.violationConsequence}.`

  return {
    title: 'Guest Stay Clause',
    clause,
    explanation: `This clause allows your tenant to have normal guests while giving you oversight of longer stays. It prevents a guest from slowly becoming a permanent resident without your knowledge, and keeps the tenant legally responsible for anyone they invite into the property.`,
    checklist: [
      'Ask for a photo ID of any long-term guest staying more than 15 days',
      'Consider requiring police verification for stays over 30 days (requirement varies by city)',
      'Watch for signs of unofficial subletting — furniture being moved in, multiple guests at once',
      'Never accept rent from a guest — this can create a parallel tenancy',
      'Note that Airbnb-style subletting to guests is usually a separate and prohibited category',
    ],
    riskNote: `In metro cities and housing societies, there are usually additional rules about guest registration. Societies often require prior approval for long-term guests. If your property is in a housing society, the society's by-laws will override your individual rental agreement on this matter.`,
  }
}

function generateEarlyTerminationClause(formData, tone, parties) {
  const { landlord, tenant } = parties
  const t = toneModifiers[tone]

  const noticePeriod = tone === 'strict' ? '60' : '30'

  const clause = `EARLY TERMINATION CLAUSE

${t.prefix} early termination of this rental agreement before the agreed end date is governed as follows:

1. NOTICE REQUIREMENT: If ${tenant} wishes to vacate the premises before the expiry of the agreed tenancy period, ${tenant} shall give ${landlord} a minimum of ${noticePeriod} days' prior written notice.

2. LANDLORD-INITIATED TERMINATION: If ${landlord} wishes to terminate the agreement before its natural expiry, ${landlord} shall give ${tenant} a minimum of ${noticePeriod} days' prior written notice, except in cases of material breach by ${tenant}.

3. LOCK-IN PERIOD: The parties agree that neither shall terminate this agreement within the first [insert lock-in period, e.g., 6 months] of the tenancy ("Lock-in Period"), except in cases of material breach, court order, or mutual written consent.

4. BREAK CLAUSE FEE: If ${tenant} terminates the agreement during the Lock-in Period, ${tenant} shall pay a break clause fee equivalent to [insert amount, e.g., 2 months'] rent in lieu of notice, in addition to surrendering the premises.

5. PROPERTY CONDITION: On early termination, ${tenant} shall return the premises in the same condition as received (fair wear and tear excepted) and shall settle all outstanding bills and dues before handover.

6. MUTUAL AGREEMENT: The parties may agree in writing to terminate the agreement on mutually acceptable terms at any time.

Any violation of this clause ${t.violationConsequence}.`

  return {
    title: 'Early Termination Clause',
    clause,
    explanation: `This clause protects you from sudden surprises. If the tenant wants to leave early, they must give you advance notice (30–60 days) and pay a fee if they leave during the lock-in period. It also protects the tenant by requiring you to give similar notice if you want them to leave.`,
    checklist: [
      'Fill in the lock-in period and break clause fee before signing',
      'Always send termination notices via registered post or in writing on WhatsApp with read receipt',
      'Do a joint property inspection on or before the termination date',
      'Ensure all keys, access cards, and utility connections are transferred on the exit date',
      'Settle the security deposit within 30 days of the agreed exit date',
    ],
    riskNote: `The enforceability of break clause fees varies by state. Some Rent Control tribunals have held such clauses invalid if they are one-sided. Ensure the termination notice requirements are mutual — i.e., they apply to both landlord and tenant — to give the clause stronger legal standing. The lock-in period should be clearly inserted before the agreement is signed.`,
  }
}

function generateCustomClause(formData, tone, parties) {
  const { landlord, tenant } = parties
  const t = toneModifiers[tone]
  const situation = formData.situation || 'the described situation'

  const clause = `SPECIAL CONDITIONS CLAUSE

${t.prefix} the following special condition applies to this rental agreement in relation to: "${situation}"

1. SPECIFIC CONDITION: Both ${landlord} and ${tenant} acknowledge the specific situation described above and agree that the following terms shall apply for the duration of the tenancy.

2. WRITTEN CONSENT REQUIRED: Any activity, arrangement, or use of the premises that falls within the scope of this special condition shall be conducted ${t.permissionPhrase}. Any change in the nature or scope of the condition requires fresh written consent.

3. TENANT COMPLIANCE: ${tenant} shall ensure full compliance with this special condition and shall be responsible for any consequences — including third-party claims, local authority requirements, or damage to property — arising from the permitted activity.

4. REGULAR REVIEW: ${landlord} may review compliance with this condition at intervals not less than 3 months, with reasonable advance notice to ${tenant}.

5. REVOCATION: If ${tenant} fails to comply with the terms of this special condition, ${landlord} may withdraw the permission and require ${tenant} to cease the relevant activity within 7 days of written notice.

Any violation of this clause ${t.violationConsequence}.

Note: This is a general-purpose clause. Please consult a lawyer to tailor this clause to your specific situation, especially if it involves commercial use, structural changes, or additional persons staying at the property.`

  return {
    title: 'Special Conditions Clause',
    clause,
    explanation: `This is a general special conditions clause that you can adapt for situations not covered by standard templates. It requires written permission, holds the tenant responsible for outcomes, and lets you review or revoke the arrangement if needed.`,
    checklist: [
      'Be as specific as possible about what you are permitting',
      'Consider taking legal advice for unusual or commercial situations',
      'Keep a written record of what you discussed and agreed',
      'If the activity involves structural changes or commercial use, consult a lawyer',
      'Check if any society or local body approval is required in addition to your consent',
    ],
    riskNote: `Custom situations may have regulatory or legal implications not covered by a general clause. For example, running a business from home may require a commercial licence or NOC from the housing society. Make sure you understand the full implications before giving written consent.`,
  }
}

/**
 * Main generation function
 * 
 * TO REPLACE WITH AI API:
 * async function generateClause(formData) {
 *   const response = await fetch('/api/generate-clause', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify(formData),
 *   })
 *   return response.json()
 * }
 */
export function generateClause(formData) {
  const tone = formData.tone || 'balanced'
  const parties = getParties(formData)
  const category = formData.category

  switch (category) {
    case 'pet':
      return generatePetClause(formData, tone, parties)
    case 'subletting':
      return generateSublettingClause(formData, tone, parties)
    case 'lateRent':
      return generateLateRentClause(formData, tone, parties)
    case 'securityDeposit':
      return generateSecurityDepositClause(formData, tone, parties)
    case 'maintenance':
      return generateMaintenanceClause(formData, tone, parties)
    case 'guest':
      return generateGuestClause(formData, tone, parties)
    case 'earlyTermination':
      return generateEarlyTerminationClause(formData, tone, parties)
    case 'custom':
    default:
      return generateCustomClause(formData, tone, parties)
  }
}