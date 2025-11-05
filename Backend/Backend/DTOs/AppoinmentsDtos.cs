namespace Backend.DTOs
{
    public class AppoinmentsDtos
    {
        public int? AppointmentId { get; set; }
        public bool IsConclude { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime AppointmentDate { get; set; }
        public string Symptoms { get; set; }
        public string DoctorName { get; set; } = string.Empty;
        public string DoctorPhone { get; set; } = string.Empty;
        public string DoctorEmail { get; set; } = string.Empty;
        public string PatientName { get; set; } = string.Empty;
        public string PatientPhone { get; set; } = string.Empty;
        public string PatientEmail { get; set; } = string.Empty;
    }
}
