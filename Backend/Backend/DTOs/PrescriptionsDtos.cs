namespace Backend.DTOs
{
    public class PrescriptionsDtos
    {
        public int? prescriptionId { get; set; }
        public string notes { get; set; } = string.Empty;
        public DateTime? createdAt { get; set; }
        public string diagnosis { get; set; } = string.Empty;
        public string DoctorName { get; set; } = string.Empty;
        public string DoctorPhone { get; set; } = string.Empty;
        public string DoctorEmail { get; set; } = string.Empty;
        public string PatientName { get; set; } = string.Empty;
        public string PatientPhone { get; set; } = string.Empty;
        public string PatientEmail { get; set; } = string.Empty;
        public List<MedicinDtos> medicines { get; set; } = new List<MedicinDtos>();
    }
}
