
/**
 * Agency card task info
 */
export default class AgencyCardInfo {
  /**
   * Task type
   */
  taskType?: string;

  /**
   * Total targets
   */
  targetValue?: string;

  /**
   * Total completed
   */
  finValue?: string;

  /**
   * Task unit
   */
  unit?: string;

  /**
   * Task date type
   */
  dateType?: boolean;

  /**
   * Whether there is a task target value
   */
  hasTargetValue?: boolean;

  /**
   * Completed quantity is empty.
   */
  finValueIsNull?:boolean;
}
