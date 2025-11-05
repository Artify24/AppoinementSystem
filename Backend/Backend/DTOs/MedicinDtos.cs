namespace Backend.DTOs
{
    public class MedicinDtos
    {
        public string medicineName { get; set; } = string.Empty;
        public string? dosage { get; set; }
        public string frequency { get; set; } = string.Empty;
        public string duration { get; set; } = string.Empty;
        public string instructions { get; set; } = string.Empty;
    }
}
