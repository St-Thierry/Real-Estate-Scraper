//o Get the "Projects" table
const table = base.getTable('Projects');
const records = await table.selectRecordsAsync();

// Set the starting date
let startDate = new Date('2023-05-05');
let i = 0;

// Generate dates and update records
for (recordId of records.recordIds) {
  
  i++;
  const recordDate = new Date(startDate.getTime() + i * 5 * 24 * 60 * 60 * 1000); // Add 5 days in milliseconds
  const dateString = recordDate.toISOString().split('T')[0]; // Format date as YYYY-MM-DD

  const apiUrl = "https://api.openai.com/v1/chat/completions"; 

  const options = {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer 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',
      'Content-Type': 'application/j0son',
    },
    body: JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "assistant", 
      content: "Act like a social media assistant and generate a caption for a social media post scheduled on" + dateString + ". Keep it strictly less than 220 characters. Spice it with emoticons"
      }
    ],
  }),
  };

  const response = await fetch(apiUrl, options);
  const jsn = await response.json(); 
  data = jsn.choices[0].message.content;


  // Update the "stamp" field for each record
  await table.updateRecordAsync(
    recordId, // Provide the record ID of the current record
    {
      'Dates': dateString,
      'Captions': data
    }
  );

  console.log("Record" + i + "updated succesfully")!;
}
