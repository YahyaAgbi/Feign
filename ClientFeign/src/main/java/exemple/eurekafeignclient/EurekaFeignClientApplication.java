package exemple.eurekafeignclient;

import exemple.eurekafeignclient.entities.Client;
import exemple.eurekafeignclient.entities.Voiture;
import exemple.eurekafeignclient.repository.VoitureRepository;
import exemple.eurekafeignclient.service.ClientService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableFeignClients
public class EurekaFeignClientApplication {

    public static void main(String[] args) {
        SpringApplication.run(EurekaFeignClientApplication.class, args);
    }

    @Bean
    CommandLineRunner initializerBaseH2(VoitureRepository voitureRepository, ClientService clientService) {
        return args -> {
            try {
                // Fetch Clients via Feign Client
                Client c1 = clientService.getClient(1);
                Client c2 = clientService.getClient(2);

                System.out.println("****************");
                System.out.println("Client 1 - Id: " + c1.getId() + ", Nom: " + c1.getNom());
                System.out.println("Client 2 - Id: " + c2.getId() + ", Nom: " + c2.getNom());
                System.out.println("****************");

                // Save Voitures linked to Clients
                voitureRepository.save(new Voiture(null, "BMW", "A55000", "Serie 7", c1.getId().intValue()));
                voitureRepository.save(new Voiture(null, "Porsche", "C63456", "Macan", c2.getId().intValue()));
                voitureRepository.save(new Voiture(null, "Audi", "B54444", "RS6", c1.getId().intValue()));

                // Retrieve and print all Voitures with Client info
                voitureRepository.findAll().forEach(voiture -> {
                    Client client = clientService.getClient(voiture.getId_client());
                    voiture.setClient(client); // Set client details for display
                    System.out.println("Voiture: " + voiture.getMarque() + ", Client: " + voiture.getClient().getNom());
                });
            } catch (Exception e) {
                System.err.println("Error during initialization: " + e.getMessage());
                e.printStackTrace();
            }
        };
    }
}
