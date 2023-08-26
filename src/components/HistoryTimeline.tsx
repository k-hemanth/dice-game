import { FC } from "react";
import { THistoryBalance } from "../types";
import { TimelineEntry } from "../styles/TimeLineStyles";

interface IHistoryTimelineProps {
  historyBalance: THistoryBalance[];
}

const HistoryTimeline: FC<IHistoryTimelineProps> = ({ historyBalance }) => {
  return (
    <div>
      <h3>Balance History</h3>
      {historyBalance.map((entry, index) => (
        <TimelineEntry key={index} balance={entry.balance}>
          <div>{entry.date}</div>
          <div>{entry.balance}</div>
        </TimelineEntry>
      ))}
    </div>
  );
};

export default HistoryTimeline;
