import { useState, useEffect } from "react";
import { getFootfall } from "../api";
import { MoveLeft, MoveRight } from "lucide-react";
import { useDataContext } from "../context";

const DatePicker = ({onDateSelect}) => {
  // The actual selected date
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // The month and year currently being viewed in the calendar
  const [viewYear, setViewYear] = useState(selectedDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(selectedDate.getMonth());

  // Calendar math based on the view month/year (not the selected date)
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptySlots = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleDayClick = (day) => {
    setSelectedDate(new Date(viewYear, viewMonth, day));
    onDateSelect(new Date(viewYear, viewMonth, day))
  };

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  // Helper to check if a rendered day is the selected date
  const isSelected = (day) => {
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === viewMonth &&
      selectedDate.getFullYear() === viewYear
    );
  };

  // Helper to highlight today's date slightly differently
  const isToday = (day) => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === viewMonth &&
      today.getFullYear() === viewYear
    );
  };

  return (
    <div className="w-full max-w-xs mx-auto p-4 bg-light rounded">
      
      {/* Header: Month/Year Navigation */}
      <div className="flex justify-between items-center pb-3 mb-3 border-b">
        <MoveLeft 
          onClick={handlePrevMonth}
          className="font-bold cursor-pointer"
        />
        <span className="font-bold">
          {monthNames[viewMonth]} {viewYear}
        </span>
        <MoveRight 
          onClick={handleNextMonth}
          className="font-bold cursor-pointer"
        />
      </div>

      {/* Mini Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {/* Days of the week header */}
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
          <div key={d} className="font-bold text-muted mb-1">{d}</div>
        ))}
        
        {/* Empty slots before the 1st of the month */}
        {emptySlots.map((slot) => (
          <div key={`empty-${slot}`} />
        ))}
        
        {/* Calendar Days */}
        {days.map((day) => {
          const selected = isSelected(day);
          const today = isToday(day);
          
          return (
            <button
              key={day}
              onClick={() => handleDayClick(day)}
              className={`h-7 w-7 flex items-center justify-center mx-auto hover:!border-primary ${
                selected 
                  ? "!bg-primary font-bold shadow-sm" 
                  : today 
                    ? "!border-secondary" 
                    : ""
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Selected Date Footer */}
      <div className="mt-1 pt-1 border-t text-center text-xs text-gray-500">
        Selected: <span className="font-semibold text-blue-600">{selectedDate.toDateString()}</span>
      </div>

    </div>
  );
};

const FootfallView = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dailyData, setDailyData] = useState(null);
  const [hourlyData, setHourlyData] = useState(null);

  const { footfall } = useDataContext();

  useEffect(() => {
    const updateDisplayData = () => {
      const yyyy = selectedDate.getFullYear();
      const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const dd = String(selectedDate.getDate()).padStart(2, '0');
      const formattedDate = `${yyyy}-${mm}-${dd}`;
      
      if (footfall) {
        setDailyData(footfall.daily_entries[formattedDate]);
        setHourlyData(footfall.hourly_entries[formattedDate]);
      }
    }

    updateDisplayData();
  }, [selectedDate, footfall]);

  // NEW: Extract the unique zone names from the first available hour to use as column headers
  const availableZones = hourlyData ? Object.keys(Object.values(hourlyData)[0] || {}) : [];

  return (
    <div className="card flex flex-col p-4 w-full h-full gap-2">
      <h1>Footfall</h1> 

      { footfall &&
        <div className="flex flex-row gap-4 flex-1 min-h-0 justify-between">
          <div>
            <DatePicker onDateSelect={setSelectedDate}/>
          </div>

          {/* Daily Footfall table */}
          { dailyData && 
            <div className="flex flex-col gap-2">
              <h2 className="font-bold shrink-0">Daily Footfall</h2>
              <div className="grid grid-flow-col w-fit h-fit">
                { Object.entries(dailyData).map(([zone, count]) => {
                  return (
                    <div key={zone} className="">
                      <p className="bg-dark font-bold p-2 text-center border">{zone}</p>
                      <p className="text-center border">{count}</p>
                    </div>
                  )
                }) }
              </div>
            </div>
          }

          {/* Hourly Footfall Table */}
          { hourlyData && 
            <div className="flex flex-col gap-2 flex-1 min-h-0">
              <h2 className="font-bold shrink-0">Hourly Footfall</h2>
              
              {/* COMBINED CONTAINER: We put both the header and data inside the scrollable div */}
              <div className="flex flex-col overflow-y-auto flex-1 min-h-0 relative">
                
                {/* 1. THE STICKY HEADER ROW */}
                {/* Added sticky, top-0, z-10, and a solid background so rows slide under it */}
                <div className="flex sticky top-0 z-10 bg-dark"> 
                  <div className="min-w-[60px] p-2 border font-bold text-center flex items-center justify-center">
                    Time
                  </div>
                  {availableZones.map((zone) => (
                    <div key={`header-${zone}`} className="flex-1 p-2 border font-bold text-center">
                      {zone}
                    </div>
                  ))}
                </div>
                
                {/* 2. THE DATA ROWS */}
                { Object.entries(hourlyData).map(([time, zones]) => {
                  return (
                    <div key={time} className="flex hover:bg-light transition-colors">
                      
                      {/* Row Time */}
                      <div className="flex items-center p-2 border min-w-[60px] justify-center bg-dark">
                        <p className="font-bold">{time.slice(0,5)}</p>
                      </div>
                      
                      {/* Row Data */}
                      {
                        availableZones.map((zone) => {
                          return (
                            <div key={`${time}-${zone}`} className="flex-1 p-2 text-center border flex flex-col justify-center">
                              <p className="text-center">{zones[zone] || 0}</p>
                            </div>
                          )
                        })
                      }
                    </div>
                  )
                }) }
              </div>
            </div>
          }
        </div>
      }
    </div>
  )
}

export default FootfallView;